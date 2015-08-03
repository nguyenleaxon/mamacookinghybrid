angular.module("sessionmanager", [])
    .service("SessionManagerService", function ($log,localStorageService) {

        this.isCategoryStoreInSession = function (key){
            return localStorageService.get(key) == null ? false:true;

        }
    }
)