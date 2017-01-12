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

	   var resultList = new Array();
       

	   
	   return resultList;
	}




	this.relativeCompliment = function(listA, listB) {

	   var resultList = new Array();

	   if(listA === null || listB === null){
		   return null;
	   }

	   
       
	   return resultList;
	}



	this.symetricDifference = function(listA, listB) {

	   var resultList = new Array();
       

	   return resultList;
	}	
	

}
