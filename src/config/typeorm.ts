import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config({ path: __dirname+'/../../.env' });




export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory:async (): Promise<TypeOrmModuleOptions> => {
        return {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/../migrations/*{.ts,.js}'],
            synchronize: false,
            extra: {
                charset: 'utf8mb4_unicode_ci',
            },
            logging: true,
        }
    }
}


export const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: false,
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    logging: true,
}


export const AppDataSource = new DataSource(typeOrmConfig)