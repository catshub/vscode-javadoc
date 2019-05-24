export const urls = (config: Config) => ({
  searchUrl: (word: string) => `${config.searchUrl}${word}`,
  docUrl: (providerObj: ProviderObj) => `${config.docUrl}?g=${providerObj.groupId}&a=${providerObj.artifactId}&v=${providerObj.version}&r=snapshots`,
})
export const command = {
  openInWeb: 'vscode-javadoc.openInWeb',
  openInVScode: 'vscode-javadoc.openInVScode',
  category: 'vscode-javadoc',
}
