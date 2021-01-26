module.exports = {
    plugins: {
     "autobar":{
         maxLevel:4,
         skipEmptySidebar:true,
         collapsable:true
     }
    },
  
    markdown:{
        toc:{
            includeLevel:[1,2,3,4]
        }
    },
    themeConfig:{
        sidebarDepth:3,
        lastUpdated:'Last Updated',
        nextLinks:true,
        prevLink:false,
        displayAllHeaders:true,
        nav:[
            {text:'Elara',link:'https://elara.patract.io/#/'}
            
        ],
        sidebar:[
        {
            collapsable:true
        }
        ]
    },
    head:[
        ['link',{rel:'shortcut icon',type:"image/x-icon",href:"https://elara.patract.io/favicon.svg"}]
    ]
  }
