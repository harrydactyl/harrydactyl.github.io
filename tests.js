function test(){
    QUnit.test("the triangle exists (6,6,6)", function(assert){
        assert.equal(triangleExists(6,6,6), true);//true
    });
    QUnit.test("the triangle doen't exist (7,3,20)", function(assert){
        assert.equal(triangleExists(7,3,20), false);//true
    });
    QUnit.test("the triangle exists (-1,-1,-1)", function(assert){
        assert.equal(triangleExists(-1,-1,-1), true);//false
    });
    QUnit.test("the triangle is right (3,4,5)", function(assert){
        assert.equal(triangleType(3,4,5), "right");//true
    });
    QUnit.test("the triangle is obtuse (6,6,6)", function(assert){
        assert.equal(triangleType(6,6,6), "obtuse");//false
    });
    QUnit.test("the triangle is acute (3,2,3)", function(assert){
        assert.equal(triangleType(3,2,3), "acute");//true
    });
}

function triangleExists(a,b,c){
    if(a+b>=c && a+c>=b && b+c>=a && a>=0 && b>=0 && c>=0){
        return(true);
    }
    else{
        return(false);
    }
}

function triangleType(a,b,c){
    if(Math.pow(a,2)+Math.pow(b,2)==Math.pow(c,2)){
        return("right");
    }
    else if(Math.pow(a,2)+Math.pow(b,2)<Math.pow(c,2)){
        return("obtuse");
    }
    else{
        return("acute");
    }
}