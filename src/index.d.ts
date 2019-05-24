interface ProviderObj {
  artifactHits: Array<{
    repositoryId: string
    artifactLinks: Array<{ extension: string }>,
  }>
  artifactId: string
  groupId: string
  hasJavaDoc: boolean
  highlightedFragment: string
  latestSnapshot: string
  latestSnapshotRepositoryId: string
  repoId: string
  version: string
}
interface SearchResult {
  code: number
  data: ProviderObj[]
  debugMsg: string
  msg: any
  success: number
}
interface Config {
  searchUrl: string
  docUrl: string
}
