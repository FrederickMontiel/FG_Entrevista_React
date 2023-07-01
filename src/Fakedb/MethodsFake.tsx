export default class MethodsFake<Table>{
    private verifyDb(){
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData === null){
            localStorage.setItem("db", JSON.stringify({}));
        }
        
        localStorageData = localStorage.getItem("db");


        let dataDb:any = JSON.parse(localStorageData as string);

        if(dataDb[this.constructor.name] === undefined){
            dataDb[this.constructor.name] = [];
            localStorage.setItem("db", JSON.stringify(dataDb));
        }
    }

    findAll(): Table[]{
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            return dataDb[this.constructor.name] as Table[];
        }

        return [];
    }

    findById(id:number): Table{
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            return dataDb[this.constructor.name].find((item:any) => item.id === id) as Table;
        }

        return {} as Table;
    }

    findOne(query: { [key: string]: any }):Table{
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            return dataDb[this.constructor.name].find((item:any) => {
                let keys = Object.keys(query);
                let isFind = true;
                keys.forEach((key)=>{
                    if(item[key] !== query[key]){
                        isFind = false;
                    }
                });
                return isFind;
            });
        }

        return {} as Table;
    }

    find(query: { [key: string]: any }):Table[]{
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            return dataDb[this.constructor.name].filter((item:any) => {
                let keys = Object.keys(query);
                let isFind = true;
                keys.forEach((key)=>{
                    if(item[key] !== query[key]){
                        isFind = false;
                    }
                });
                return isFind;
            });
        }

        return [];
    }
        
    create(data:Table){
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            dataDb[this.constructor.name].sort((a:any, b:any) => a.id - b.id);
            let lastId = dataDb[this.constructor.name].length > 0?parseInt(dataDb[this.constructor.name][dataDb[this.constructor.name].length - 1].id + 1) : 1;
            dataDb[this.constructor.name].push({
                ...data,
                id: lastId
            });

            
            localStorage.setItem("db", JSON.stringify(dataDb));
        }
    }

    updateOne(id:number, data:Table){
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            dataDb[this.constructor.name] = dataDb[this.constructor.name].map((item:any) => {
                    if(item.id === id){
                        return {
                            ...item,
                            ...data
                        }
                    }
                    return item;
                }
            );
            localStorage.setItem("db", JSON.stringify(dataDb));

        }
    }

    delete(id:number){
        this.verifyDb();
        let localStorageData:String | null = localStorage.getItem("db");

        if(localStorageData){
            let dataDb:any = JSON.parse(localStorageData as string);

            dataDb[this.constructor.name] = dataDb[this.constructor.name].filter((item:any) => item.id !== id);
            localStorage.setItem("db", JSON.stringify(dataDb));
        }
    }
}