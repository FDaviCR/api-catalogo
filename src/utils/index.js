module.exports = {
    async convertDate(stringDate) {
        let dd = stringDate.substring(0,2);
        let mm = stringDate.substring(3,5);
        let yyyy = stringDate.substring(6,10);
        let hhmm = stringDate.substring(11);
        
        return new Date(yyyy+"/"+mm+"/"+dd+" "+hhmm);
    }
};