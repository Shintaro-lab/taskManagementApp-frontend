import {app, BrowserWindow,Menu} from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';
import isDev from 'electron-is-dev';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let api_path = process.argv[2];
let children = spawn('tm.exe',{cwd:api_path});

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreperences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    
}

const template = Menu.buildFromTemplate([{
    label: '表示',
    submenu: [
        {role: 'reload', label: '再読み込み'}
    ]
}]);

Menu.setApplicationMenu(template);

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        
        const killProcess = spawn('taskkill',['/pid',children.pid,'/t','/f'],{shell: true});

        killProcess.on('close', (code) => {
            console.log(`taskkill process exited with code ${code}`);
            app.quit();
        });
        
    }
});