import categoryRepository from "../repository/category.repository";
import throwError from "../utils/create-error";

class CategoryServices {
    private async checkNameExist(name: string) {
        if (await categoryRepository.findName(name)) {
            throwError(409, 'Category name is already exists');
        }
    }

    private async checkIdExist(id: string) {
        if (!(await categoryRepository.findId(id))) {
            throwError(404, 'Category name not found');
        }
    }

    async addCategory(name: string) {
        await this.checkNameExist(name);
        return await categoryRepository.create(name);
    }

    async removeCategory(id: string) {
        await this.checkIdExist(id);
        return await categoryRepository.remove(id);
    }

    async editCategory(id: string, newName: string) {
        return await categoryRepository.edit(id, newName);
    }

    async getAllCategory(categoryName?: string) {
        return await categoryRepository.getAll(categoryName);
    }
}

const categoryServices = new CategoryServices();
export default categoryServices;