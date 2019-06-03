SystemJS.config({
  //production: true,
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "react-jsonapi/": "src/"
    //"react-jsonapi/": "/"
  },
  browserConfig: {
    "baseURL": "/"
  },
  meta: {
    "*.css": {
      "loader": "css"
    }
  },
  map: {
    "loose-envify": "npm:loose-envify@1.4.0",
    "object-assign": "npm:object-assign@4.1.1",
    "fbjs": "npm:fbjs@0.8.17",
    "invariant": "npm:invariant@2.2.4",
    "warning": "npm:warning@2.1.0",
    "query-string": "npm:query-string@4.3.4",
    "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
  },
  devConfig: {
    "map": {
      "babel-plugin-transform-react-jsx": "npm:babel-plugin-transform-react-jsx@6.24.1",
      "core-js": "npm:core-js@2.6.9",
      "css": "github:systemjs/plugin-css@0.1.37",
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    },
    "packages": {
      "npm:babel-plugin-transform-react-jsx@6.24.1": {
        "map": {
          "babel-helper-builder-react-jsx": "npm:babel-helper-builder-react-jsx@6.26.0",
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "babel-plugin-syntax-jsx": "npm:babel-plugin-syntax-jsx@6.18.0"
        }
      },
      "npm:babel-helper-builder-react-jsx@6.26.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "babel-types": "npm:babel-types@6.26.0",
          "esutils": "npm:esutils@2.0.2"
        }
      },
      "npm:babel-runtime@6.26.0": {
        "map": {
          "core-js": "npm:core-js@2.6.9",
          "regenerator-runtime": "npm:regenerator-runtime@0.11.1"
        }
      },
      "npm:babel-types@6.26.0": {
        "map": {
          "babel-runtime": "npm:babel-runtime@6.26.0",
          "esutils": "npm:esutils@2.0.2",
          "lodash": "npm:lodash@4.17.11",
          "to-fast-properties": "npm:to-fast-properties@1.0.3"
        }
      }
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "react-jsonapi": {
      "main": "index.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    },
    //"react-jsonapi": {
      //"main": "dist/react-jsonapi.js",
      //"meta": {
        //"*.js": {
          //"format": "cjs"
        //}
      //}
    //},
    "examples": {
      "main": "examples/test.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel",
          "babelOptions": {
            "plugins": [
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      }
    },
    "npm:warning@2.1.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "history": "npm:history@3.3.0",
    "react-dom": "npm:react-dom@16.8.6",
    "codemirror": "npm:codemirror@5.47.0",
    "create-react-class": "npm:create-react-class@15.6.3",
    "prop-types": "npm:prop-types@15.7.2",
    "assert": "npm:jspm-nodelibs-assert@0.2.1",
    "backbone": "npm:backbone@1.4.0",
    "backbone-relational": "npm:backbone-relational@0.10.0",
    "buffer": "npm:jspm-nodelibs-buffer@0.2.3",
    "child_process": "npm:jspm-nodelibs-child_process@0.2.1",
    "constants": "npm:jspm-nodelibs-constants@0.2.1",
    "crypto": "npm:jspm-nodelibs-crypto@0.2.1",
    "domain": "npm:jspm-nodelibs-domain@0.2.1",
    "events": "npm:jspm-nodelibs-events@0.2.2",
    "fs": "npm:jspm-nodelibs-fs@0.2.1",
    "http": "npm:jspm-nodelibs-http@0.2.0",
    "https": "npm:jspm-nodelibs-https@0.2.2",
    "jquery": "npm:jquery@3.4.1",
    "jquery-mockjax": "npm:jquery-mockjax@2.5.0",
    "os": "npm:jspm-nodelibs-os@0.2.2",
    "path": "npm:jspm-nodelibs-path@0.2.3",
    "process": "npm:jspm-nodelibs-process@0.2.1",
    "react": "npm:react@16.8.6",
    "react-router": "npm:react-router@3.2.1",
    "stream": "npm:jspm-nodelibs-stream@0.2.1",
    "string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.2",
    "underscore": "npm:underscore@1.9.1",
    "url": "npm:jspm-nodelibs-url@0.2.1",
    "util": "npm:jspm-nodelibs-util@0.2.2",
    "vm": "npm:jspm-nodelibs-vm@0.2.1",
    "zlib": "npm:jspm-nodelibs-zlib@0.2.3"
  },
  packages: {
    "npm:query-string@4.3.4": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "strict-uri-encode": "npm:strict-uri-encode@1.1.0"
      }
    },
    "npm:isomorphic-fetch@2.2.1": {
      "map": {
        "node-fetch": "npm:node-fetch@1.7.3",
        "whatwg-fetch": "npm:whatwg-fetch@3.0.0"
      }
    },
    "npm:jspm-nodelibs-http@0.2.0": {
      "map": {
        "http-browserify": "npm:stream-http@2.8.3"
      }
    },
    "npm:browserify-zlib@0.1.4": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "pako": "npm:pako@0.2.9"
      }
    },
    "npm:encoding@0.1.12": {
      "map": {
        "iconv-lite": "npm:iconv-lite@0.4.24"
      }
    },
    "npm:url@0.11.0": {
      "map": {
        "punycode": "npm:punycode@1.3.2",
        "querystring": "npm:querystring@0.2.0"
      }
    },
    "npm:browserify-rsa@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "randombytes": "npm:randombytes@2.1.0"
      }
    },
    "npm:des.js@1.0.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:warning@3.0.0": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:backbone-relational@0.10.0": {
      "map": {
        "underscore": "npm:underscore@1.9.1",
        "backbone": "npm:backbone@1.4.0"
      }
    },
    "npm:jquery-mockjax@2.5.0": {
      "map": {
        "jquery": "npm:jquery@3.4.1"
      }
    },
    "npm:backbone@1.4.0": {
      "map": {
        "underscore": "npm:underscore@1.9.1"
      }
    },
    "npm:react-router@3.2.1": {
      "map": {
        "history": "npm:history@3.3.0",
        "create-react-class": "npm:create-react-class@15.6.3",
        "prop-types": "npm:prop-types@15.7.2",
        "hoist-non-react-statics": "npm:hoist-non-react-statics@2.5.5",
        "loose-envify": "npm:loose-envify@1.4.0",
        "invariant": "npm:invariant@2.2.4",
        "warning": "npm:warning@3.0.0"
      }
    },
    "npm:jspm-nodelibs-os@0.2.2": {
      "map": {
        "os-browserify": "npm:os-browserify@0.3.0"
      }
    },
    "npm:jspm-nodelibs-buffer@0.2.3": {
      "map": {
        "buffer": "npm:buffer@5.2.1"
      }
    },
    "npm:jspm-nodelibs-domain@0.2.1": {
      "map": {
        "domain-browser": "npm:domain-browser@1.2.0"
      }
    },
    "npm:jspm-nodelibs-stream@0.2.1": {
      "map": {
        "stream-browserify": "npm:stream-browserify@2.0.2"
      }
    },
    "npm:jspm-nodelibs-crypto@0.2.1": {
      "map": {
        "crypto-browserify": "npm:crypto-browserify@3.12.0"
      }
    },
    "npm:jspm-nodelibs-string_decoder@0.2.2": {
      "map": {
        "string_decoder": "npm:string_decoder@0.10.31"
      }
    },
    "npm:jspm-nodelibs-zlib@0.2.3": {
      "map": {
        "browserify-zlib": "npm:browserify-zlib@0.1.4"
      }
    },
    "npm:jspm-nodelibs-url@0.2.1": {
      "map": {
        "url": "npm:url@0.11.0"
      }
    },
    "npm:history@3.3.0": {
      "map": {
        "warning": "npm:warning@3.0.0",
        "invariant": "npm:invariant@2.2.4",
        "loose-envify": "npm:loose-envify@1.4.0",
        "query-string": "npm:query-string@4.3.4"
      }
    },
    "npm:create-react-class@15.6.3": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "fbjs": "npm:fbjs@0.8.17",
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:prop-types@15.7.2": {
      "map": {
        "object-assign": "npm:object-assign@4.1.1",
        "loose-envify": "npm:loose-envify@1.4.0",
        "react-is": "npm:react-is@16.8.6"
      }
    },
    "npm:fbjs@0.8.17": {
      "map": {
        "core-js": "npm:core-js@1.2.7",
        "object-assign": "npm:object-assign@4.1.1",
        "loose-envify": "npm:loose-envify@1.4.0",
        "ua-parser-js": "npm:ua-parser-js@0.7.19",
        "promise": "npm:promise@7.3.1",
        "isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
        "setimmediate": "npm:setimmediate@1.0.5"
      }
    },
    "npm:buffer@5.2.1": {
      "map": {
        "ieee754": "npm:ieee754@1.1.13",
        "base64-js": "npm:base64-js@1.3.0"
      }
    },
    "npm:loose-envify@1.4.0": {
      "map": {
        "js-tokens": "npm:js-tokens@4.0.0"
      }
    },
    "npm:invariant@2.2.4": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0"
      }
    },
    "npm:stream-browserify@2.0.2": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "inherits": "npm:inherits@2.0.3"
      }
    },
    "npm:stream-http@2.8.3": {
      "map": {
        "readable-stream": "npm:readable-stream@2.3.6",
        "inherits": "npm:inherits@2.0.3",
        "to-arraybuffer": "npm:to-arraybuffer@1.0.1",
        "xtend": "npm:xtend@4.0.1",
        "builtin-status-codes": "npm:builtin-status-codes@3.0.0"
      }
    },
    "npm:crypto-browserify@3.12.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-ecdh": "npm:create-ecdh@4.0.3",
        "randomfill": "npm:randomfill@1.0.4",
        "browserify-sign": "npm:browserify-sign@4.0.4",
        "browserify-cipher": "npm:browserify-cipher@1.0.1",
        "create-hmac": "npm:create-hmac@1.1.7",
        "diffie-hellman": "npm:diffie-hellman@5.0.3",
        "randombytes": "npm:randombytes@2.1.0",
        "public-encrypt": "npm:public-encrypt@4.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "create-hash": "npm:create-hash@1.2.0"
      }
    },
    "npm:readable-stream@2.3.6": {
      "map": {
        "string_decoder": "npm:string_decoder@1.1.1",
        "inherits": "npm:inherits@2.0.3",
        "process-nextick-args": "npm:process-nextick-args@2.0.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "isarray": "npm:isarray@1.0.0",
        "core-util-is": "npm:core-util-is@1.0.2",
        "util-deprecate": "npm:util-deprecate@1.0.2"
      }
    },
    "npm:randomfill@1.0.4": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-sign@4.0.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "create-hmac": "npm:create-hmac@1.1.7",
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.1",
        "parse-asn1": "npm:parse-asn1@5.1.4",
        "browserify-rsa": "npm:browserify-rsa@4.0.1"
      }
    },
    "npm:diffie-hellman@5.0.3": {
      "map": {
        "randombytes": "npm:randombytes@2.1.0",
        "bn.js": "npm:bn.js@4.11.8",
        "miller-rabin": "npm:miller-rabin@4.0.1"
      }
    },
    "npm:create-hmac@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11",
        "ripemd160": "npm:ripemd160@2.0.2"
      }
    },
    "npm:browserify-cipher@1.0.1": {
      "map": {
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "browserify-des": "npm:browserify-des@1.0.2"
      }
    },
    "npm:promise@7.3.1": {
      "map": {
        "asap": "npm:asap@2.0.6"
      }
    },
    "npm:randombytes@2.1.0": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:create-ecdh@4.0.3": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "elliptic": "npm:elliptic@6.4.1"
      }
    },
    "npm:public-encrypt@4.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "bn.js": "npm:bn.js@4.11.8",
        "browserify-rsa": "npm:browserify-rsa@4.0.1",
        "parse-asn1": "npm:parse-asn1@5.1.4",
        "randombytes": "npm:randombytes@2.1.0",
        "create-hash": "npm:create-hash@1.2.0"
      }
    },
    "npm:create-hash@1.2.0": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "sha.js": "npm:sha.js@2.4.11",
        "md5.js": "npm:md5.js@1.3.5",
        "ripemd160": "npm:ripemd160@2.0.2"
      }
    },
    "npm:string_decoder@1.1.1": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:pbkdf2@3.0.17": {
      "map": {
        "create-hmac": "npm:create-hmac@1.1.7",
        "create-hash": "npm:create-hash@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "sha.js": "npm:sha.js@2.4.11",
        "ripemd160": "npm:ripemd160@2.0.2"
      }
    },
    "npm:elliptic@6.4.1": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "bn.js": "npm:bn.js@4.11.8",
        "hmac-drbg": "npm:hmac-drbg@1.0.1",
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hash.js": "npm:hash.js@1.1.7",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:evp_bytestokey@1.0.3": {
      "map": {
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "md5.js": "npm:md5.js@1.3.5"
      }
    },
    "npm:parse-asn1@5.1.4": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "pbkdf2": "npm:pbkdf2@3.0.17",
        "browserify-aes": "npm:browserify-aes@1.2.0",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "asn1.js": "npm:asn1.js@4.10.1"
      }
    },
    "npm:browserify-aes@1.2.0": {
      "map": {
        "create-hash": "npm:create-hash@1.2.0",
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "evp_bytestokey": "npm:evp_bytestokey@1.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "buffer-xor": "npm:buffer-xor@1.0.3"
      }
    },
    "npm:cipher-base@1.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:sha.js@2.4.11": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:browserify-des@1.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "cipher-base": "npm:cipher-base@1.0.4",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "des.js": "npm:des.js@1.0.0"
      }
    },
    "npm:miller-rabin@4.0.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "brorand": "npm:brorand@1.1.0"
      }
    },
    "npm:md5.js@1.3.5": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:ripemd160@2.0.2": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "hash-base": "npm:hash-base@3.0.4"
      }
    },
    "npm:hmac-drbg@1.0.1": {
      "map": {
        "minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1",
        "hash.js": "npm:hash.js@1.1.7"
      }
    },
    "npm:asn1.js@4.10.1": {
      "map": {
        "bn.js": "npm:bn.js@4.11.8",
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:node-fetch@1.7.3": {
      "map": {
        "encoding": "npm:encoding@0.1.12",
        "is-stream": "npm:is-stream@1.1.0"
      }
    },
    "npm:hash.js@1.1.7": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "minimalistic-assert": "npm:minimalistic-assert@1.0.1"
      }
    },
    "npm:hash-base@3.0.4": {
      "map": {
        "inherits": "npm:inherits@2.0.3",
        "safe-buffer": "npm:safe-buffer@5.1.2"
      }
    },
    "npm:iconv-lite@0.4.24": {
      "map": {
        "safer-buffer": "npm:safer-buffer@2.1.2"
      }
    },
    "npm:react@16.8.6": {
      "map": {
        "prop-types": "npm:prop-types@15.7.2",
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "scheduler": "npm:scheduler@0.13.6"
      }
    },
    "npm:scheduler@0.13.6": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1"
      }
    },
    "npm:react-dom@16.8.6": {
      "map": {
        "loose-envify": "npm:loose-envify@1.4.0",
        "object-assign": "npm:object-assign@4.1.1",
        "prop-types": "npm:prop-types@15.7.2",
        "scheduler": "npm:scheduler@0.13.6"
      }
    }
  }
});
