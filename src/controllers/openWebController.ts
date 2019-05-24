import * as vscode from 'vscode'
import fetch from 'node-fetch'
import { urls, command } from '../config'

export const hoverProvider = async (
  document: vscode.TextDocument,
  position: vscode.Position,
  token: vscode.CancellationToken,
): Promise<vscode.ProviderResult<vscode.Hover>> => {
  const hoverMsg = null
  const config = vscode.workspace.getConfiguration('vscode-javadoc')
  if (!config.searchUrl || !config.docUrl) return hoverMsg
  const range = document.getWordRangeAtPosition(position)
  if (range) {
    const hoverWord = document.getText(range)
    if (/\S+provider$/i.test(hoverWord)) {
      const configedUrls = urls(config as any)
      const result: SearchResult = await fetch(configedUrls.searchUrl(hoverWord)).then(res => res.json())
      if (result.success && result.data.length) {
        const firstResult = result.data[0]
        const showWord = `${firstResult.groupId}:${firstResult.artifactId}`
        const args = { url: configedUrls.docUrl(firstResult) }
        const textLink = `[${showWord}](command:${command.openInWeb}?${JSON.stringify(args)} "Open in Web")`
        const vscodeLink = `[[&rightarrow;]](command:${command.openInVScode}?${JSON.stringify(args)} "Open in VSCode")`
        const markdown = new vscode.MarkdownString(`${textLink} ${vscodeLink}`)
        markdown.isTrusted = true
        return new vscode.Hover(markdown)
      }
    }
  }
  return hoverMsg
}
