var require = {
    paths: {
        "jquery": "lib/jquery-1.7.2.min",
        "knockout": "lib/knockout-2.1.0",
        "amplify": "lib/amplify.min",
        "knockout.mapping": "lib/knockout.mapping-latest",
        "linq": "lib/linq.min"
    },
    shim: {
        'amplify': {
            deps: ['jquery'],
            exports: 'amplify'
        }
    }
};