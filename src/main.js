import { app, BrowserWindow, ipcMain, net } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { v4 as uuidv4 } from 'uuid';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    title: 'Goida Zvon',
    width: 1280,
    height: 720,
    minHeight: 500,
    minWidth: 940,
    center: true,
    titleBarStyle: 'hidden',
    frame: false,
    resizable: true,
    transparent: false,
    trafficLightPosition: {
        x: 16,
        y: 10
    },
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  ipcMain.on('window-action', (event, action) => {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      if (action === 'minimize') window.minimize();
      if (action === 'maximize') window.isMaximized() ? window.unmaximize() : window.maximize();
      if (action === 'close') window.close();
    }
  })

  ipcMain.on('loadScreenApplication', (event, message) => {
      console.log('[loadScreenApplication] Frontend loaded');
  })
  ipcMain.on('create-channel', async (event, channelInfo) => {
    console.log("[create-channel] Received data: ", channelInfo); 
    const apiUrl = import.meta.env.VITE_API_URL;

    try{
      const serverResponse = await fetch(`${apiUrl}/api/channels/${channelInfo.serverId}/create-channel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${channelInfo.token}`
        },
        body: JSON.stringify({
          name: channelInfo.name,
          type: channelInfo.type,
          private: channelInfo.private,
          groupId: channelInfo.groupId,
          description: channelInfo.name,
        }),
      });

      console.log(await serverResponse.json());
    }
    catch(error){
      console.log(error)
    }
  })
  ipcMain.on('create-server', async (event, serverInfo) => {
    console.log("[create-server] Received data: ", serverInfo); 
  
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData();
  
    // Добавляем данные в formData
    formData.append('token', serverInfo.token);
    formData.append('name', serverInfo.name);
  
    // Получаем изображение по URL и добавляем его как файл
    try {
      const response = await fetch(serverInfo.avatarUrl); // Получаем изображение по URL
      const blob = await response.blob();  // Преобразуем в Blob
  
      // Используем uuidv4() для создания уникального имени файла
      const fileName = `${uuidv4()}.jpg`;  // Генерация уникального имени для аватара

      formData.append('avatar', blob, fileName);  // Добавляем файл с уникальным именем
  
      // Логируем содержимое FormData перед отправкой
      formData.forEach((value, key) => {
        console.log(key, value);  // Логируем каждый ключ и значение
      });
  
      // Отправляем данные через fetch
      const serverResponse = await fetch(`${apiUrl}/api/servers/create`, {
        method: 'POST',
        headers: {
/*           'Content-Type': 'application/json', */
          'Authorization': `Bearer ${serverInfo.token}`,  // Передаем токен авторизации
        },
        body: formData
/*         body: JSON.stringify({
            name: serverInfo.name,
            avatarUrl: blob,

        }),   */
      });
  
      const data = await serverResponse.json();  // Получаем данные от сервера
      console.log('[client preserver]: ', data);  // Логируем ответ от сервера
      event.reply('server-create-response');
    } catch (err) {
      console.log('Ошибка запроса:', err);
    }
  });
  ipcMain.on('LoginUser', async (event, message) => {
    const apiUrl = import.meta.env.VITE_API_URL;
  
    const release = JSON.parse(message);
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: release.email,
          password: release.password
        })
      });


      if (response.status === 200) {
        const data = await response.json();
/*         mainWindow.webContents.executeJavaScript(`window.localStorage.setItem('token', '${data.token}')`);
        UserSession.set(...UserSession.get(), {token: data.token}); */
        /* window.localStorage.setItem('token', data.token); */
        const userResponse = await net.fetch(`${apiUrl}/api/users/me`,
        {
            headers: {
            'Authorization': `Bearer ${data.token}`,
            }
        })
        const userData = await userResponse.json();
        if(userResponse.status === 200) {
            event.reply('LoginUserResponse', {
              success: true,
              token: data.token,
              userData
            })
        }else{
          event.reply('LoginUserResponse', { success: false, error: userData.error });
        }

      } else {
        event.reply('LoginUserResponse', data.error);
      }
    } catch (error) {
      event.reply('LoginUserResponse', { success: false, error: data.error });
    }
  })
  ipcMain.on('registerUserAccounts', async (event, message) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        // Преобразуем строку в объект
        const dataRelease = JSON.parse(message);
        console.log('[backend] registerUserAccounts : ', dataRelease);

        // Выполняем запрос
        const response = await net.fetch(`${apiUrl}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataRelease), // Здесь преобразуем объект в JSON-строку
        });

        // Парсим ответ
        const json = await response.json();
        // Отправляем ответ обратно на фронтенд
        event.reply('registerUserAccountsResponse', json);
    } catch (error) {
        console.error('[backend] Error in registerUserAccounts:', error);
        event.reply('registerUserAccountsError', { error: error.message });
    }
});
  // and load the index.html of the app.
  console.log('[createWindow]', MAIN_WINDOW_VITE_DEV_SERVER_URL);
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
