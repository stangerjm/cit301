function Set() {


	this.intersection = function(listA, listB) {

	   var resultList = [];

	   if(listA === null || listB === null){
	   	  return null;
	   }


	   var lengthA = listA.length;
	   var lengthB = listB.length;

	   for(var i = 0; i < lengthA; i++){
		   var nextValue = listA[i];
		   for(var j = 0; j < lengthB; j++){
			   if(listB[j] === nextValue){
				   resultList.push(listB[j]);
				   break;
			   }
		   }
	   }

	   return resultList;
	}



	this.union = function(listA, listB) {

	   var resultList = [];

        if(listA === null || listB === null){
            return null;
        }

	   var sDif = this.symetricDifference(listA, listB);
	   var intersect = this.intersection(listA, listB);

	   var sDifLen = sDif.length;
	   var intersectLen = intersect.length;

	   for(var i = 0; i < sDifLen; i++){
	   	  resultList.push(sDif[i]);
	   }

	   for(var i = 0; i < intersectLen; i++){
	   	  resultList.push(intersect[i]);
	   }

	   return resultList;
	}




	this.relativeCompliment = function(listA, listB) {

	   var resultList = [];


	   if(listA === null || listB === null){
		   return null;
	   }


        var seen = [];
        for ( var i = 0; i < listB.length; i++) {
            seen[listB[i]] = true;
        }

        for ( var i = 0; i < listA.length; i++) {
            if (!seen[listA[i]]) {
                resultList.push(listA[i]);
            }
        }


	   return resultList;
	}



	this.symetricDifference = function(listA, listB) {

	   var resultList = [];

        if(listA === null || listB === null){
            return null;
        }

	   var relA = this.relativeCompliment(listA, listB);
	   var relB = this.relativeCompliment(listB, listA);
	   var relBLen = relB.length;
	   var relALen = relA.length;

	   for(var i = 0; i < relALen; i++){
	   	  resultList.push(relA[i]);
	   }

	   for(var i = 0; i < relB.length; i++){
	   	  resultList.push(relB[i]);
	   }

	   return resultList;
	}


}
