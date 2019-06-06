module.exports ={
    user:{
        queryAll:'select * from user'
    },
    menu:{
        queryAll:'select * from menu where type=? and menuType=? order by addDate asc',
    },
    info:{
    	insert:'insert into information (title,addDate,img,username,type,firstType) values(?,?,?,?,?,?)',
    	queryAll:'select * from information where type =? and firstType =? order by addDate desc',
        insertImg:'insert into information(img) values(?)'
    }
}