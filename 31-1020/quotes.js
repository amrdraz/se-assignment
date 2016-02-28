var DB =require('./db');

exports.getElementByIndexElseRandom=function(arr,index){
        index = index === undefined ? Math.floor(Math.random() * arr.length) : index;
        return arr[index];
};
exports.getQuotesFromJSON=function(){

            var json=require('../quotes.json');
            return json;

};
exports.getQuoteFromJSON=function(index){
    var json=require('../quotes.json');
    //console.log(json);
    return exports.getElementByIndexElseRandom(json,index);
};
exports.seed=function(cd){

  var arr = exports.getQuotesFromJSON();

    DB.connect(function(err,db){
        if (err){
            cd(err,false);
            return ;
        }
        else{
            
            var table=db.collection('quotes');
            table.find({}).toArray(function(err,data){
                if (err){
                    cd(err,false);
                }
                else{
                    if (!data.length){

                        table.insert(arr);

                    }
                    cd(err,true);
                }
            });

        }
    });
};
exports.getQuotesFromDB=function(cd){
    DB.connect(function(err,db){
        if (err){
            console.log('error');
            cd(err)
        }
        else{
            //console.log('connected');
            var conn=db.collection('quotes');
           var arr= conn.find({}).toArray(cd);


        }
    });
};
exports.getQuoteFromDB=function(cd,index){
       exports.getQuotesFromDB(function(err,quotes){
           if (err){
               console.log('error occured here');
               cd(err);
           }
           else{
               cd(err,exports.getElementByIndexElseRandom(quotes,index));
           }
       })
};