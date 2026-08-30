import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack, { type Configuration } from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const { EnvironmentPlugin } = webpack;

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';

// На Pages сайт лежит в подкаталоге. 'auto' не годится: на /product/12 путь станет /product/main.js
const publicPath = process.env.PUBLIC_PATH ?? '/';

/** @type {import("webpack").Configuration} */
const config: Configuration = {
    entry: './src/index.tsx',
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProduction ? '[name].[contenthash].js' : '[name].js',
        publicPath,
        clean: true,
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new EnvironmentPlugin({
            API_URL: 'https://dummyjson.com',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            templateParameters: { publicPath },
        }),
        ...(isProduction ? [new MiniCssExtractPlugin()] : []),
        new CopyPlugin({
            patterns: [{ from: 'public', to: '.' }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};
