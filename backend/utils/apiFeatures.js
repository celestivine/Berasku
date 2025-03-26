class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = {
                nama: {
                    $regex: this.queryStr.keyword,
                    $options: "i"
                }
            };
    
            console.log("Search Query:", keyword); // Debugging
    
            this.query = this.query.find(keyword);
        }
    
        return this;
    }
}

module.exports = APIFeatures;