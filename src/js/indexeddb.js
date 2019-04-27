(function (window) {
    function openStore(storeName) {
        return new Promise(function (resolve, reject) {
            if (!('indexedDB' in window)) {
                reject('don\'t support indexedDB');
            }
            var request = indexedDB.open('PWA_DB', 1);
            request.onerror = function (e) {
                console.log('连接数据库失败');
                reject(e);
            }
            request.onsuccess = function (e) {
                console.log('连接数据库成功');
                console.log(e);
                resolve(e.target.result);
            }
            request.onupgradeneeded = function (e) {
                console.log('数据库版本升级');
                console.log(e);
                var db = e.srcElement.result;
                if (e.oldVersion === 0) {
                    // contains 是判断 db.objectStoreNames 中是否有storeName
                    if (!db.objectStoreNames.contains(storeName)) {
                        // 创建对象仓库 createObjectStore keyPath 为tag
                        var store = db.createObjectStore(storeName, {
                            keyPath: 'tag'
                        });
                        // 创建索引 如果存的数据不会重复 unique 参数设置为true
                        store.createIndex(storeName + 'Index', 'tag', {
                            unique: false
                        });
                        console.log('创建索引成功');
                    }
                }
            }
        })
    }

    function getdata (STORE_NAME, tag) {
        return new Promise(function (resolve, reject) {
            openStore().then(function (db) {
                try {
                    // 创建事务进行数据库查询
                    var tx = db.transaction(STORE_NAME, 'readonly');
                    var store = tx.objectStore(STORE_NAME);
                    var dbRequest = store.get(tag);
                    dbRequest.onsuccess = function (e) {
                        resolve(e.target.result);
                    };
                    dbRequest.onerror = function (err) {
                    };
                }
                catch (e) {
                    reject(e);
                }
            })
        })
    }
    function deletedata (STORE_NAME, tag) {
        return new Promise(function (resolve, reject) {
            openStore().then(function (db) {
                try {
                    // 创建事务进行数据库查询
                    var tx = db.transaction(STORE_NAME, 'readwrite');
                    var store = tx.objectStore(STORE_NAME);
                    var dbRequest = store.delete(tag);
                    dbRequest.onsuccess = function (e) {
                        resolve(e.target.result);
                    };
                    dbRequest.onerror = function (err) {
                    };
                }
                catch (e) {
                    reject(e);
                }
            })
        })
    }
    var STORE_NAME = 'testDb';
    var tag = 'sample_sync_db';
    openStore(STORE_NAME).then(function (db) {
        // 创建一个可以读写的事务
        var tx = db.transaction(STORE_NAME, 'readwrite');
        // 访问对象仓库
        var store = tx.objectStore(STORE_NAME);
        var item = {
            tag: tag,
            name: '1'
        };
        // 用put 不用关心数据是否存在
        store.put(item);
    });
    getdata(STORE_NAME, tag).then(function (data) {
        console.log(data);
    });
    deletedata(STORE_NAME, tag).then(function (data) {
        console.log(data);
    });

})(window)