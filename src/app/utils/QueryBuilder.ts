import { Query } from "mongoose";
import { excludeField } from "../constants";

export class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public readonly query: Record<string, string>

    constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    filter(): this {
        const filter = { ...this.query }

        for (const field of excludeField) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete filter[field]
        }
        this.modelQuery = this.modelQuery.find(filter);

        return this;
    }

    search(searchableField: string[]): this {
        const search = this.query.search || ""
        const searchQuery = {
            $or: searchableField.map(field => ({ [field]: { $regex: search, $options: "i" } }))
        }
        this.modelQuery = this.modelQuery.find(searchQuery);

        return this
    }

    sort(): this {
        const sort = this.query.sort || "-createdAt";
        this.modelQuery = this.modelQuery.sort(sort)

        return this;
    }

    fields(): this {
        const fields = this.query.fields?.split(",").join(" ") || "";
        this.modelQuery = this.modelQuery.select(fields);

        return this;
    }

    paginate(): this {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);

        return this;
    }

    build() {
        return this.modelQuery
    }

    // async getMeta() {
    //     const totalDocuments = await this.modelQuery.model.countDocuments();
    //     const page = Number(this.query.page) || 1;
    //     const limit = Number(this.query.limit) || 10;

    //     const totalPage = Math.ceil(totalDocuments / limit);

    //     return { page, limit, total: totalDocuments, totalPage };
    // }

    // Handel for Multiple Option
    async getMeta(filter: Record<string, unknown> = {}) {
        // Use the same query conditions applied earlier + optional extra filter
        const conditions = { ...this.modelQuery.getFilter(), ...filter };

        const totalDocuments = await this.modelQuery.model.countDocuments(conditions);

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const totalPage = Math.ceil(totalDocuments / limit);

        return { page, limit, total: totalDocuments, totalPage };
    }
}