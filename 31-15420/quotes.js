var DB =require('./db');
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

exports.getElementByIndexElseRandom=function(arr,index){
        if (index===undefined){
            return arr[parseInt(getRandom(0,arr.length),10)];
        }
    else{
             return arr[index];
        }
};
exports.getQuotesFromJSON=function(){

            var json=require('../quotes.json');
            return json;

};
exports.getQuoteFromJSON=function(index){
    var json=require('../quotes.json');
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
            //console.log('connected');
            var conn=db.collection('quotes');
            conn.find({}).toArray(function(err,data){
                if (err){
                    cd(err,false);
                }
                else{
                    if (!data.length){
                        conn.insert(arr);
                        cd(err,true);

                    }
                    else cd(err,false);
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
               console.log('err');
               cd(err);
           }
           else{
               cd(err,exports.getElementByIndexElseRandom(quotes,index));
           }
       })
};