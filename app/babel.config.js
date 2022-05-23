module.exports = function(api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        utils: './src/utils',
                        assets: './assets',
                        types: './src/types',
                        components: './src/components',
                        constants: './src/constants',
                        hooks: './src/hooks',
                        providers: './src/providers',
                        navigation: './src/navigation',
                        screens: './src/screens',
                        themes: './src/themes',
                    },
                    root: ['./src'],
                },
            ],
        ],
    };
};
