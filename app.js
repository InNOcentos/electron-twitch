const electron = require("electron");
const {app, BrowserWindow, ipcMain} = electron;

function createWindow() {
  // Создаем окно браузера.
    const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // и загружаем index.html в приложении.
  win.loadFile(__dirname + `./src/index.html`);

  // Отображаем средства разработчика.
  win.webContents.openDevTools();  
}

app.whenReady().then(createWindow);



app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
