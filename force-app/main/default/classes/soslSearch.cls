public with sharing class soslSearch {

    @AuraEnabled(cacheable=true)
    public static List<User> getUsersList() {
        List<User> u = [select Name, Id from User];
        system.debug(u);
        return u;
    }

    @AuraEnabled(cacheable=true)
    public static User getUserByName(String searchKey){
        User u = [select Name, Id from User where Name =:searchKey];
        system.debug(u);
        return u;
    }

    @AuraEnabled(cacheable=true)
    public static SObject getUserByNameSOSL(String searchKeySOSL){
        String soslQuery = 'FIND {' + searchKeySOSL + '} IN Name Fields RETURNING User(Name), Contact(Name)';
        System.debug(soslQuery);
        List<List<SObject>> results = System.Search.query(soslQuery);
        if (results.size() > 0) {
            List<SObject> users = results[0];
            if (users.size() > 0) {
                return users[0];
            }
        }
        return null;
    }

    @AuraEnabled(cacheable=true)
    public static List<SObject> getContentVersions(String cvSOSL){
        String soslQuery = 'FIND {*' + cvSOSL + '*} IN ALL FIELDS RETURNING CONTENTVERSION(ID, TITLE)';
        System.debug(soslQuery);
        List<List<SObject>> searchList = System.Search.query(soslQuery);
        // List<List<SObject>> searchList = [FIND :searchKeyCV IN ALL FIELDS RETURNING CONTENTVERSION(ID, TITLE)];
        system.debug(searchList);
        if (searchList.size() > 0 && !(searchList[0].isEmpty())) {
            return searchList[0];
        } else {
            return new List<SObject>();
        }
    }
}
