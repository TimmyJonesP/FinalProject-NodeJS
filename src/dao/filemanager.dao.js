const fs = require('fs');

class FileManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async loadItems() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = await fs.promises.readFile(this.filePath);
                const items = JSON.parse(data);
                return items;
            }
            return [];
        } catch (error) {
            throw error;
        }
    }

    async saveItems(items) {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(items, null, 2));
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FileManager;