import * as vscode from 'vscode'
import * as open from 'open'
import { hoverProvider } from './controllers/openWebController'
import { command } from './config'

const langs = ['javascript', 'typescript']

export function activate(context: vscode.ExtensionContext) {
  initCommand(context)
  vscode.languages.registerHoverProvider(langs, {
    provideHover: hoverProvider as any,
  })
}

function initCommand(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(command.openInWeb, data => {
      if (!data || !data.url) return vscode.window.showWarningMessage('No Url', data)
      open(data.url)
    }),
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(command.openInVScode, data => {
      if (!data || !data.url) return vscode.window.showWarningMessage('No Url', data)
      const panel = vscode.window.createWebviewPanel(command.category, 'JavaDoc', vscode.ViewColumn.One, {
        enableScripts: true,
        retainContextWhenHidden: true,
      })
      panel.webview.html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>JavaDoc</title>
          <style>
            html, body {
              height: 100%;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <iframe height="100%" width="100%" src="${data.url}"></iframe>
        </body>
      </html>
      `
    }),
  )
}
