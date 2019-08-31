let net;

async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Sucessfully loaded model');
  //show button
  document.getElementById('loader').classList.add("hide");
  document.getElementById('classify').classList.add("show");
  document.getElementById('classify').addEventListener('click', () => doClassify());
  
  async function singleclf(img){
		const result =  await net.classify(img);
		return result;
	}
	async function doClassify () {
		const imgEl = document.getElementById('list').children;
		const results = [];
		for (const img of imgEl) {
	    // Good: all asynchronous operations are immediately started.
	    results.push(singleclf(img.querySelector('img.thumb')));
	   }
	   const classified = await Promise.all(results);
	   classified.forEach(function(prediction,index){
	      document.getElementById('list').children[index].querySelector('div.name').innerHTML=
	      [prediction[0].className,'(~',Math.round(prediction[0].probability*100),'%)'].join('');
	   })
	   console.log(classified);
	}
	
  
}

app();