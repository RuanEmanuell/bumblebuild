import { BuildRepository } from '../repositories/build.repository';

export class BuildService {
  private buildRepository = new BuildRepository();

  async createBuild(data: { userId: number; name: string; partIds: number[] }) {
    const { userId, name, partIds } = data;

    if (!userId) throw new Error('User ID is required');
    if (!name) throw new Error('Build name is required');
    if (!partIds || !Array.isArray(partIds) || partIds.length === 0) {
      throw new Error('At least one part ID must be provided');
    }

    // Aqui você pode adicionar validações extras, ex: verificar se as partes existem, se são compatíveis, etc

    return await this.buildRepository.createBuild(userId, name, partIds);
  }

  async getUserBuilds(userId: number) {
    if (!userId) throw new Error('User ID is required');
    return await this.buildRepository.findBuildsByUser(userId);
  }
}
