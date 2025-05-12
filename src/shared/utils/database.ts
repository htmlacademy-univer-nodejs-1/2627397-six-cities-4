export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string
): string {
  return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?authSource=admin`;
}
