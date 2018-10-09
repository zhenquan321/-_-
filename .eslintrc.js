// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    extends: 'airbnb-base',
    // required to lint *.vue files
    plugins: ['html'],
    // check if imports actually resolve
    settings: {
        'import/resolver': {
            webpack: {
                config: 'build/webpack.base.conf.js'
            }
        }
    },
    // add your custom rules here
    rules: {
        // don't require .vue extension when importing
        'import/extensions': [
            'error',
            'always',
            {
                js: 'never',
                vue: 'never'
            }
        ],
        // allow optionalDependencies
        'import/no-extraneous-dependencies': [
            'error',
            {
                optionalDependencies: ['test/unit/index.js']
            }
        ],
        'prefer-template': 'off',
        'import/first': 'absolute-first',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        indent: ['error', 4],
        'comma-dangle': ['error', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                line: {
                    markers: ['/'],
                    exceptions: ['-', '+']
                },
                block: {
                    markers: ['!'],
                    exceptions: ['*'],
                    balanced: true
                }
            }
        ],
        'no-underscore-dangle': [
            'error',
            {
                allowAfterThis: true
            }
        ],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info']
            }
        ],
        'arrow-parens': ['error', 'as-needed'],
        'no-unused-expressions': ['error', { allowShortCircuit: true }],
        'no-param-reassign': [
            'error',
            {
                props: false
            }
        ],
        'no-mixed-operators': 0,
        'linebreak-style': ["off", "windows"],
        // 关闭语句强制分号结尾    
        "semi": [0],    
        //空行最多不能超过100行    
        "no-multiple-empty-lines": [0, {"max": 100}],    
        //关闭禁止混用tab和空格    
        "no-mixed-spaces-and-tabs": [0],
        "no-trailing-spaces": 0,//一行结束后面不要有空格
        "no-spaced-func": 0,//函数调用时 函数名与()之间不能有空格
        "no-multi-spaces": 0,//不能用多余的空格
        "no-irregular-whitespace": 0,//不能有不规则的空
        "no-plusplus": 0,
        "no-console": 0,

    }
};
