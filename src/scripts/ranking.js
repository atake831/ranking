(function() {
    var module = angular.module('ranking', []);

    module.run(function($http) {
    });

    module.factory('Storage', function() {
        return {
            _localDataKey: 'RankingLocalData',
            _set: function(key, value) {
                localStorage.setItem(key, value);
            },
            _get: function(key) {
                return localStorage.getItem(key);
            },
            _remove: function(key) {
                return localStorage.removeItem(key);
            },
            set: function(key, value) {
                var localData = JSON.parse(this._get(_localDataKey)) || {};
                localData[key] = value;
                this._set(_localDataKey, JSON.stringify(localData));
            },
            get: function(key) {
                var localData = JSON.parse(this._get(_localDataKey));
                if ( localData ) {
                    return localData[key];
                }
                return null;
            },
            getAll: function() {
                return JSON.parse(this._get(_localDataKey));
            },
            remove: function(key) {
                var localData = JSON.parse(this._get(_localDataKey));
                if ( localData ) {
                    localData[key] = null;
                }
            },
            clear: function() {
                return localStorage.clear();
            },
        }
    });

    module.factory('Auth', function(Storage) {
        var key = 'auth_token_key';
        return {
            hasToken: function() {
                return this.getToken !== null;
            },
            setToken: function(token) {
                Storage.set(key, token);
            },
            getToken: function(token) {
                return Storage.get(key);
            },
        };
    });

    module.factory('API', function($http) {
        return {};
    });

    module.factory('Util', function() {
        return {};
    });

})();
