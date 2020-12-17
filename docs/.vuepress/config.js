module.exports = {
    plugins: {
     "autobar":{
         maxLevel:4,
         skipEmptySidebar:true
     }
    },
    themeConfig:{
        lastUpdated:'Last Updated',
        nextLinks:true,
        prevLink:false,
        displayAllHeaders:true,
        nav:[
            {text:'Elara',link:'https://elara.patract.io/#/'}
            
        ]
    },
    head:[
        ['link',{rel:'shortcut icon',type:"image/x-icon",href:"https://elara.patract.io/favicon.ico"}]
    ]
  }
