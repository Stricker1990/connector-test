export default class SpaceXService {
    static readonly BASE_URL = 'https://api.spacexdata.com';
    async getRocketById(id: string) {
        return `rocket: ${id}`;
    }
}