import { app, shell, BrowserWindow } from 'electron';
import * as path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 260,
    height: 155,
    show: false,
    autoHideMenuBar: true,
    // transparent: true, //无边框//true的话mac不显示了
    resizable: false, //是否可放大
    // frame: false, //是否有边框
    ...(process.platform === 'linux'
      ? {
          icon: path.join(__dirname, '../../build/icon.png'),
        }
      : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
    icon: join(__dirname, '../../src/renderer/src/assets/wpspaster-logo-circle.png'),
    // icon: join(__dirname, '../../src/renderer/public/favicon-512x512.ico'),
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
  if (app.isPackaged) {
    // 是否处于打包
  } else {
    app.removeAsDefaultProtocolClient('wpspaster', process.execPath, [
      path.resolve(process.argv[1]),
    ]); //删除伪协议
  }
  app.quit(); //这里会退出进程
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //允许跨域
  await app.listen(9000); //renderer http://127.0.0.1:5173
}
bootstrap();
