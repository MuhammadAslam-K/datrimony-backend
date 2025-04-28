import { Document, FilterQuery, Model, UpdateQuery } from "mongoose";

export abstract class BaseRepository<T extends Document> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return this.model.find(filter);
    }

    async findOne(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOne(filter);
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findByIdAndUpdate(id: string, update: UpdateQuery<T>, options = { new: true }): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, update, options);
    }

    async findOneAndUpdate(filter: FilterQuery<T>, update: UpdateQuery<T>, options = { new: true }): Promise<T | null> {
        return this.model.findOneAndUpdate(filter, update, options);
    }

    async findByIdAndDelete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }

    async findOneAndDelete(filter: FilterQuery<T>): Promise<T | null> {
        return this.model.findOneAndDelete(filter);
    }

    async countDocuments(filter: FilterQuery<T> = {}): Promise<number> {
        return this.model.countDocuments(filter);
    }

    async exists(filter: FilterQuery<T>): Promise<boolean> {
        const result = await this.model.exists(filter);
        return !!result;
    }

    async aggregate(pipeline: any[]): Promise<any[]> {
        return this.model.aggregate(pipeline);
    }
}