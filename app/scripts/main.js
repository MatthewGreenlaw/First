addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type === 'text' && theInput.className.match(/\bcleardefault\b/)) {  
            /* Add event handlers */          
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);
            if (theInput.value !== '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}   
            
            

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value === '' && target.defaultText) {
        target.value = target.defaultText;
    }
}

//BEGIN util-functions.js 

function addEvent(element, eventType, lamdaFunction, useCapture) {
    if (element.addEventListener) {
        element.addEventListener(eventType, lamdaFunction, useCapture);
        return true;
    } else if (element.attachEvent) {
        var r = element.attachEvent('on' + eventType, lamdaFunction);
        return r;
    } else {
        return false;
    }
}

/* 
 * Kills an event's propagation and default action
 */
function knackerEvent(eventObject) {
    if (eventObject && eventObject.stopPropagation) {
        eventObject.stopPropagation();
    }
    if (window.event && window.event.cancelBubble ) {
        window.event.cancelBubble = true;
    }
    
    if (eventObject && eventObject.preventDefault) {
        eventObject.preventDefault();
    }
    if (window.event) {
        window.event.returnValue = false;
    }
}

/* 
 * Safari doesn't support canceling events in the standard way, so we must
 * hard-code a return of false for it to work.
 */
function cancelEventSafari() {
    return false;        
}

/* 
 * Cross-browser style extraction, from the JavaScript & DHTML Cookbook
 * <http://www.oreillynet.com/pub/a/javascript/excerpt/JSDHTMLCkbk_chap5/index5.html>
 */
function getElementStyle(elementID, CssStyleProperty) {
    var element = document.getElementById(elementID);
    if (element.currentStyle) {
        return element.currentStyle[toCamelCase(CssStyleProperty)];
    } else if (window.getComputedStyle) {
        var compStyle = window.getComputedStyle(element, '');
        return compStyle.getPropertyValue(CssStyleProperty);
    } else {
        return '';
    }
}

/* 
 * CamelCases CSS property names. Useful in conjunction with 'getElementStyle()'
 * From <http://dhtmlkitchen.com/learn/js/setstyle/index4.jsp>
 */
function toCamelCase(CssProperty) {
    var stringArray = CssProperty.toLowerCase().split('-');
    if (stringArray.length == 1) {
        return stringArray[0];
    }
    var ret = (CssProperty.indexOf("-") == 0)
              ? stringArray[0].charAt(0).toUpperCase() + stringArray[0].substring(1)
              : stringArray[0];
    for (var i = 1; i < stringArray.length; i++) {
        var s = stringArray[i];
        ret += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return ret;
}

/*
 * Disables all 'test' links, that point to the href '#'
 */
function disableTestLinks() {
  var pageLinks = document.getElementsByTagName('a');
  for (var i=0; i<pageLinks.length; i++) {
    if (pageLinks[i].href.match(/[^#]#$/)) {
      addEvent(pageLinks[i], 'click', knackerEvent, false);
    }
  }
}

/* 
 * Cookie functions
 */
function createCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        var expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

function readCookie(name) {
    var cookieCrumbs = document.cookie.split(';');
    var nameToFind = name + '=';
    for (var i = 0; i < cookieCrumbs.length; i++) {
        var crumb = cookieCrumbs[i];
        while (crumb.charAt(0) == ' ') {
            crumb = crumb.substring(1, crumb.length); /* delete spaces */
        }
        if (crumb.indexOf(nameToFind) === 0) {
            return crumb.substring(nameToFind.length, crumb.length);
        }
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, '', -1);
}
//util-functions.js END

//BEGIN clear-default-text.js
/*
 * Clear Default Text: functions for clearing and replacing default text in
 * <input> elements.
 */

addEvent(window, 'load', init, false);

function init() {
    var formInputs = document.getElementsByTagName('input');
    for (var i = 0; i < formInputs.length; i++) {
        var theInput = formInputs[i];
        
        if (theInput.type == 'text' && theInput.className.match(/\bcleardefault\b/)) {  
            /* Add event handlers */          
            addEvent(theInput, 'focus', clearDefaultText, false);
            addEvent(theInput, 'blur', replaceDefaultText, false);
            
            /* Save the current value */
            if (theInput.value != '') {
                theInput.defaultText = theInput.value;
            }
        }
    }
}

function clearDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == target.defaultText) {
        target.value = '';
    }
}

function replaceDefaultText(e) {
    var target = window.event ? window.event.srcElement : e ? e.target : null;
    if (!target) return;
    
    if (target.value == '' && target.defaultText) {
        target.value = target.defaultText;
    }
}
//clear-default-text.js END

//BEGIN Password validation from bestbuy.com

/* function profileValAddEvent(e,r,t){
    e.addEventListener?e.addEventListener(r,t,!1):e.attachEvent&&e.attachEvent("on"+r,t)}
function profileValLoadScript(e,r){
    var t=document.getElementsByTagName("head")[0],a=document.createElement("script");a.src=e,a.addEventListener?a.addEventListener("load",r,!1):a.readyState&&(a.onreadystatechange=function(){
            "loaded"===this.readyState&&r()}),t.appendChild(a)}
function profileValLoadStyle(e){
    var r=document.getElementsByTagName("head")[0],t=document.createElement("link");t.type="text/css",t.href=e,t.rel="stylesheet",r.appendChild(t)}
function profileValInitJsHostString(){
    var e,r=document.getElementsByTagName("script");for(e=0;r.length>e;e++)(r[e].src.indexOf("profile-validation.js")>0||r[e].src.indexOf("profile-validation-min.js")>0)&&(profileValJsHostString=r[e].src.substr(0,r[e].src.indexOf("/BestBuy_US")))}
function profileValDecorator(e,r){
    var t,a;return e.$element.addClass("client-error-input"),t=$('<div class="client-error-msg">'+r[0]+" </div>"),e.$element.after(t),a=$(".ca_"+e.attribute+"_info"),a.length>0&&a.hide(),
        function(){
            a.length>0&&a.show(),e.$element.removeClass("client-error-input"),e.$element.hasClass("errorInput")&&e.$element.removeClass("errorInput"),t.remove()}}
function profileValConstructValidatr(){
    require(["js/_validatr/validatr/validatr","js/_validatr/formDecorator/formDecorator"],
    function(e,r){
        var 
        t,a,o,i,s,n,l,p,f,d,c,u,m,h,g,w,v,V,M,y,b,A,_,C,P,O,E,x,N=new e([{attribute:"TxtEmail",validate:"presenceOf",message:profileValMsgMap.email},{attribute:"TxtEmail",validate:profileValRegexMap.email,message:profileValMsgMap.email},{attribute:"PwdPassword",validate:"presenceOf",message:profileValMsgMap.password}]),
        S=new r({form:$("form.signInForm"),onBlur:!0,validator:N,decorator:profileValDecorator});window.signInValidator=N,window.signInFormDecorator=S,
        t=new e([profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail,profileValAttrMap.firstNamePresenceOf,profileValAttrMap.lastNamePresenceOf,profileValAttrMap.pwdPresenceOf,profileValAttrMap.pwdEntropy,profileValAttrMap.zipCodePresenceOf,profileValAttrMap.phNumPresenceOf,profileValAttrMap.firstNameCustom,profileValAttrMap.lastNameCustom,profileValAttrMap.zipCodeCustom,profileValAttrMap.phNumCustom]),
        a=new r({form:$("form.caForm"),onBlur:!0,validator:t,decorator:profileValDecorator}),window.caValidatr=t,window.caFormDecorator=a,
        o=new e([profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail,profileValAttrMap.firstNamePresenceOf,profileValAttrMap.lastNamePresenceOf,profileValAttrMap.pwdPresenceOf,profileValAttrMap.pwdEntropy,profileValAttrMap.zipCodePresenceOf,profileValAttrMap.firstNameCustom,profileValAttrMap.lastNameCustom,profileValAttrMap.zipCodeCustom]),
        i=new r({form:$("form.caFormLegacy"),onBlur:!0,validator:o,decorator:profileValDecorator}),window.caValidatrLegacy=o,window.caFormDecoratorLegacy=i,
        s=new e([profileValAttrMap.lastNamePresenceOf]),
        n=new r({form:$("form.lastNameForm"),onBlur:!0,validator:s,decorator:profileValDecorator}),window.lastNameValidatr=s,window.lastNameFormDecorator=n,
        l=new e([{attribute:"billingPhone",validate:"presenceOf",message:profileValMsgMap.phoneNumber},{attribute:"orderId",validate:"presenceOf",message:profileValMsgMap.orderId},{attribute:"Txtln",validate:"presenceOf",message:profileValMsgMap.lastName}]),
        p=new r({form:$("form.chkOrderStatusForm-na"),onBlur:!0,validator:l,decorator:profileValDecorator}),window.chkOrderStatusValidatr=l,window.chkOrderStatusFormDecorator=p,
        f=new e([profileValAttrMap.pwdPresenceOf]),
        d=new r({form:$("form.caFormStore"),onBlur:!0,validator:f,decorator:profileValDecorator}),window.caStoreValidatr=f,window.caStoreFormDecorator=d,c=null,c=0!=$('form[name="frmCreateAccountInformation"]').find("input[name=TxtEmail]").length?new e([profileValAttrMap.addressCustom,profileValAttrMap.cityCustom,profileValAttrMap.addressPresenceOf,profileValAttrMap.cityPresenceOf,profileValAttrMap.firstNamePresenceOf,profileValAttrMap.firstNameCustom,profileValAttrMap.lastNameCustom,profileValAttrMap.lastNamePresenceOf,profileValAttrMap.zipCodeCustom,profileValAttrMap.zipCodePresenceOf,profileValAttrMap.phNumCustom,profileValAttrMap.phNumPresenceOf,profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail]):new e([profileValAttrMap.addressCustom,profileValAttrMap.cityCustom,profileValAttrMap.addressPresenceOf,profileValAttrMap.cityPresenceOf,profileValAttrMap.firstNamePresenceOf,profileValAttrMap.firstNameCustom,profileValAttrMap.lastNameCustom,profileValAttrMap.lastNamePresenceOf,profileValAttrMap.zipCodeCustom,profileValAttrMap.zipCodePresenceOf,profileValAttrMap.phNumCustom,profileValAttrMap.phNumPresenceOf]),
        u=new r({form:$("form.caFormGift"),onBlur:!0,validator:c,decorator:profileValDecorator}),window.caGiftValidatr=c,window.caGiftFormDecorator=u,m=null,m=0!=$('form[name="frmCreateGuestAccountExplicit"]').find("input[name=TxtEmail]").length?new e([profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail]):new e([profileValAttrMap.pwdPresenceOf]),
        h=new r({form:$("form.caGuestAccForm"),onBlur:!0,validator:m,decorator:profileValDecorator}),window.caGuestAccValidatr=m,window.caGuestAccFormDecorator=h,
        g=new e([profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail,profileValAttrMap.confEmailMatch,{attribute:"TxtEmailCurrent",validate:"presenceOf",message:profileValMsgMap.email},{attribute:"TxtEmailCurrent",validate:profileValRegexMap.email,message:profileValMsgMap.email}]),
        w=new r({form:$("form.changeEmailForm"),onBlur:!0,validator:g,decorator:profileValDecorator}),window.caChangeEmailValidatr=g,window.caChangeEmailFormDecorator=w,
        v=new e([profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail]),
        V=new r({form:$("form.forgotPwdForm"),onBlur:!0,validator:v,decorator:profileValDecorator}),window.caForgotPwdValidatr=v,window.caForgotPwdFormDecorator=V,M=new e([{attribute:"oldPassword",validate:"presenceOf",message:profileValMsgMap.currentPassword},{attribute:"password",validate:"presenceOf",message:profileValMsgMap.password},{attribute:"password",validate:"passwordFormat",message:profileValMsgMap.passwordMinEntropy}]),
        y=new r({form:$("form.changePwd"),onBlur:!0,validator:M,decorator:profileValDecorator}),window.caChangePwdValidatr=M,window.caChangePwdFormDecorator=y,
        b=new e([{attribute:"password",validate:"presenceOf",message:profileValMsgMap.password},{attribute:"password",validate:"passwordFormat",message:profileValMsgMap.passwordMinEntropy}]),
        A=new r({form:$("form.resetPwd"),onBlur:!0,validator:b,decorator:profileValDecorator}),window.caResetPwdValidatr=b,window.caResetPwdFormDecorator=A,_=new e([profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail,profileValAttrMap.confEmailMatch]),
        C=new r({form:$("form.myAccChangeEmailForm"),onBlur:!0,validator:_,decorator:profileValDecorator}),window.caMyAccChangeEmailValidatr=_,window.caMyAccChangeEmailFormDecorator=C,
        P=new e([profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail,profileValAttrMap.firstNamePresenceOf,profileValAttrMap.firstNameCustom,profileValAttrMap.lastNameCustom,profileValAttrMap.lastNamePresenceOf]),
        O=new r({form:$("form.formhsbccreate"),onBlur:!0,validator:P,decorator:profileValDecorator}),window.caHSBCValidatr=P,window.caHSBCFormDecorator=O,
        E=new e([profileValAttrMap.pwdPresenceOf,profileValAttrMap.emailPresenceOf,profileValAttrMap.emailIsEmail]),
        x=new r({form:$("form.formhsbcsignin"),onBlur:!0,validator:E,decorator:profileValDecorator}),window.signInHSBCValidatr=E,window.signInHSBCFormDecorator=x})}
function profileValValidatrLoaded(){profileValConstructValidatr()}
function profileValRequireJsLoaded(){profileValLoadScript(profileValJsHostString+"/BestBuy_US/store/js/validatr.bootstrap.js",profileValValidatrLoaded)}
function profileValBackboneLoaded(){profileValLoadScript(profileValJsHostString+"/BestBuy_US/store/js/require.js",profileValRequireJsLoaded)}
function profileValUnderScoreLoaded(){profileValLoadScript(profileValJsHostString+"/BestBuy_US/js/backbone.js",profileValBackboneLoaded)}
function profileValJQryLoaded(){profileValLoadScript(profileValJsHostString+"/BestBuy_US/js/underscore.js",profileValUnderScoreLoaded)}

var profileValMsgMap={email:"Please enter your e-mail address.",currentEmail:"Please enter your current e-mail address.",newEmail:"Please enter your new e-mail address.",emailConfirm:"Please reenter your e-mail address.",firstName:"Please enter your first name.",lastName:"Please enter your last name.",password:"Please enter your password.",currentPassword:"Please enter your current password.",passwordMinLen:"Your password must be at least 8 characters long.",passwordMinEntropy:"Your password must be more complex.",passwordConfirm:"Passwords don't match. Please try again.",phoneNumber:"Please enter your phone number.",zipCode:"Please enter a ZIP code.",orderId:"Please enter your order number.",passwordRegex:"Password must be 8 to 30 characters and contain at least one number. Cannot contain spaces or special characters. Please try again to create a new password.",address:"Please enter your address.",city:"Please enter your city name."}
,profileValRegexMap={email:/^([A-Za-z0-9-_.'`~!#$%^&*?|/{}+])+@(([A-Za-z0-9-_.'`~!#$%^&*?|/{}+])+([.]))+[A-Za-z]{2,10}$/i,password:/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,100})$/i,alphanum:/^[A-Za-z0-9-.' ]*[&]?[A-Za-z0-9-.' ]*$/i,phoneNum_en_US:/^\([2-9][0-9]{2}\)[ ]*[2-9][0-9]{2}[ ]*[-]*[ ]*[0-9]{4}$|^[2-9][0-9]{2}[ ]*[\.-]*[ ]*[2-9][0-9]{2}[ ]*[\.-]*[ ]*[0-9]{4}$/i,zipCode_en_US:/^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$|^[0-9]{5} [0-9]{4}$|^[0-9]{9}$/i,address_line1:/^[a-zA-Z0-9 ]*([a-zA-Z0-9 ]*['-.`#]{1}[a-zA-Z0-9 ]*){0,3}[a-zA-Z0-9 ]*$/i}
,profileValAttrMap={emailPresenceOf:{attribute:"TxtEmail",validate:"presenceOf",message:profileValMsgMap.email}
,emailIsEmail:{attribute:"TxtEmail",validate:profileValRegexMap.email,message:profileValMsgMap.email}
,firstNamePresenceOf:{attribute:"TxtFirstName",validate:"presenceOf",message:profileValMsgMap.firstName}
,firstNameCustom:{attribute:"TxtFirstName",validate:profileValRegexMap.alphanum,message:profileValMsgMap.firstName}
,lastNamePresenceOf:{attribute:"TxtLastName",validate:"presenceOf",message:profileValMsgMap.lastName}
,lastNameCustom:{attribute:"TxtLastName",validate:profileValRegexMap.alphanum,message:profileValMsgMap.lastName}
,pwdPresenceOf:{attribute:"PwdPassword",validate:"presenceOf",message:profileValMsgMap.password}
,pwdCustom:{attribute:"PwdPassword",validate:profileValRegexMap.password,message:profileValMsgMap.passwordRegex},pwdEntropy:{attribute:"PwdPassword",validate:"passwordFormat",message:profileValMsgMap.passwordMinEntropy}
,zipCodePresenceOf:{attribute:"TxtPostalCode",validate:"presenceOf",message:profileValMsgMap.zipCode}
,zipCodeCustom:{attribute:"TxtPostalCode",validate:profileValRegexMap.zipCode_en_US,message:profileValMsgMap.zipCode}
,phNumPresenceOf:{attribute:"TxtPhoneNumber",validate:"presenceOf",message:profileValMsgMap.phoneNumber}
,phNumCustom:{attribute:"TxtPhoneNumber",validate:profileValRegexMap.phoneNum_en_US,message:profileValMsgMap.phoneNumber}
,orderNumPresenceOf:{attribute:"orderId",validate:"presenceOf",message:profileValMsgMap.orderId}
,addressPresenceOf:{attribute:"TxtAddress1",validate:"presenceOf",message:profileValMsgMap.address}
,cityPresenceOf:{attribute:"TxtCity",validate:"presenceOf",message:profileValMsgMap.city}
,addressCustom:{attribute:"TxtAddress1",validate:profileValRegexMap.address_line1,message:profileValMsgMap.address}
,cityCustom:{attribute:"TxtCity",validate:profileValRegexMap.alphanum,message:profileValMsgMap.city}
,confEmailMatch:{attribute:"TxtEmailConfirm",validate:function(e,r,t){
    return t.TxtEmail&&!this.validationErrors().TxtEmail?e?e.toUpperCase()===t.TxtEmail.toUpperCase():!1:!0}
,message:profileValMsgMap.emailConfirm}
,confPwdMatch:{
        attribute:"PwdPasswordConfirm",validate:function(e,r,t){
            return t.PwdPassword&&!this.validationErrors().PwdPassword?e===t.PwdPassword:!0}
,message:profileValMsgMap.passwordConfirm}}
,profileValJsHostString="";$(
    function(){
        profileValInitJsHostString(),profileValLoadStyle(profileValJsHostString+"/BestBuy_US/store/styles/client-side-error-min.css"),profileValConstructValidatr()}
        )
        ,define("js/_password/entropyCalculator",[],
        function(){
            function e(e){
                for(var t=[],a=0;e.length/3>a;a++)t[a]=r(e.slice(3*a,3*a+3));return t}
            function r(e){
                for(var r=0,t=0;e.length>t;t++)r+=e.charCodeAt(t)-32,r/=95;return r}function t(e){if("string"!=typeof e||e.length>1)throw new TypeError("char must be a single character string");
                for(var r in n)if(n.hasOwnProperty(r)&&n[r].isClass(e))return r}
            function a(e){
                for(var r=[],a=0;e.length>a;a++)r.push(t(e.charAt(a)));return r=_.uniq(r),_.reduce(r,
                    function(e,r){
                        return e+n[r].value},0)}
                    function o(e){
                        return e=e.charAt(0).toLowerCase(),"a">e||e>"z"?0:e.charCodeAt(0)-96}
                    function i(r){
                        var t,i,n,l,p,f;if("string"!=typeof r)throw new TypeError("entropyCalucator parameter must be a string");for(l=0,p=0,n=Math.log(a(r))/Math.log(2),l=o(r.charAt(0)),f=1;r.length>f;f++)i=o(r.charAt(f)),t=1-e(s)[27*l+i]||1,p+=n*t*t,l=i;return Math.max(p,n)}
                    var s='gL6-A$A:#@\'$KT#<c"06"8*"Wb"5-$Kr t%#f+"S4$7;$ v!R=%!6 g@#s}&\'P#rM"a8"K\'!3= #V }o wx*bZ"X="De#2 #~B!dL!\\\\"(u qj#Pf L_"e (1K$9--x6 SE"x- .$)/s%rK(w""QV"oQ ;; {_ [| q@(8t-G7#nU MW cS2$9 UJ GH <]*#S !: >!\'kQ \\Z @A)O8 5& E (L""YZ r_&g2 66 ~& *L!n* zO,|Y)B8 V.#X: qI\'V0 B7 s@4<B)>= I-$wt!;A =h ?G+y: p/ |k"}} &w"]?#72 W) j$ @w S !I700V\'gf (Q cf!9{9cL Qa .i #Z, F *M NZ!0c RX!+%((N S$ ]o#hU#{o Z2#j_ 6P d% I!!wX _Z.nH!i.!@y!6T#a$"Yt ?]!kv Jl"]{ sh!2$&x~"5F.8X AF!n2 :A1G@(\'.%5} 24!TZ XY \\P zq G,).J)>} GD _o Xu*di&m0!%Q  L-KA @I ei%4P <S 8m+NI l& Gg&m+"nS$T{%&? YT e( Mu g2 ~., B(\\P N6 .d .M:^6 gg"]s"k2\':6 LU /h#k_ 6-#$3%p9 W$ 7x&)(%_-">[#Q8 VM y( 3q c* vn/va-K> ^N Il LQ/y9 qF *< /k+^O zp K;"bZ!M\\!>(*NW L\' .-#=<"Uz$^:$o? C] F\' /)"+) FC+8H$M&!l1&2\'#n"&K<!d-#"_ jw A{ J(#~e$Yi#(v.Ng#NF!V8 zM"Q4*RH&.X E""n; ^5 41 gM!xj("Q1![ bn #!";?1la yU mR A6)GK @="w5!k$!bX"b[)K-!R) Mq Fl&uz Zx&p\\ <A X\' f&!B_ xj)GW.3F <G *5 .e-}6 (6 C-!U>)S< :r#=;#:C 9Q!xJ,7< w" Tp#*1%|F#Ze&JW Dn /$ ]("4( H{&>!.@h W[ .F"G}/#k :_ ,U ;$04E \\,!/P)h9!Hq f4( f S& 18 M^":\'#w|#]o 7= !# Y]"*4 YZ-<E0$]"B^ QO bn/$G )> zO e>-|+ \\? SY (d$nj b%)p+%aQ 2P oa!U\\ mp$x: S: *$ &.!9( 3-3KD&WW WG"jB\'`),:t I<\'T_ I=($C Pd!;M 5I 3a"h %_G $, .E (_%wZ(WC!*] w> "$ s} WT h;*Kd UY!JW")u",)"v6!AU"Mv RS"hZ "("Ya&e/%5S-w\\"/W#b1 lF*fp%a6$3c$aH#uf!e> cH!]v 58*En+r< Ic v< gh,&\\ +A ;a$2!)I. !8 :w$>E 2Q fH+LA$)$ Gl+NL"y9"43$30 "8 d% 8l u% cV$pm 6C 2O uH .S K@ $= DB B(!f6 =9 <R *I uH A@ dG )A `K NX 3L !sopL %: o1 h0 9/ (U(5?-Q8!&=!iX"f(0\\[ ~V!ii )\\,<? 2W!l*!}#"\\8#NX)pn S0 Iv!{M$Rs#A2#s"!$R k& ]J!Yi {#4jR%m` --$\\D ;(*>X ]K lS"H~\'c; ;K#hP!/^!(l !S#z+##d [H F\\%Z3/b-#)f /O c% 66!YO 2w+{3,}? {N I1  O3^6 !? xV"s5-3I `R wn (E wj Kq\';: KA XU&_\'#b|$<N$2C qX w# iu!yO Fr($1"T@"pg"eA#+3\'g<!w$":w `7$\\ !Z)#qf%I4%$x*pf!kN"/* T9(Z])+?&O5"9"!nP 2< {9 5q R-\'0~5)4 ^= j8 us9#/ @1 }3 Ul0+- U6 *K!&? +K!]p()0 Z$ va!e} Y< fl!rQ *) C( KJ#f4 $;\'v.5aO W` w*!A<0IC yG ru!KR-*/
                    /*<\\ ,-!&3!Ap&Jc\'+` V& s5"gB$gF!`>!B0 hO g. ;w"I5 |v7:@&:o %h#zz H"(wx tL rk!q\\*w9 {D Q-!T_!lF!O$%vF&cB 8 "Mp!SZ\'he!HP rq!>N"BA"Y3 wR8^U$.~ ee#K[";,#IZ ;f!KI!eE!XQ d-#s/$JY%Pz%/F$+Y#2$ XX#Ez\'5g$z9"9$!1y vB 51!La @T*\\f0)j ek L3!^@1t- II Zn m@,08 )0!-@!<-! |"Fp&Oj A& N_ U[ P>!-h$D` 3a!K\' `d#uc%',
                    n={lowerCase:{value:26,filter:/[a-z]/},upperCase:{value:26,filter:/[A-Z]/},digit:{value:10,filter:/\d/},digitSymbol:{value:10,filter:"!@#$%^&*()"},otherSymbol:{value:10,filter:"`~-_=+[]{}\\|;:'\",<.>/?"},space:{value:1,filter:" "},extendASCII:{value:160,filter:
                    function(e){
                        return 32>e.charCodeAt(0)||e.charCodeAt(0)>126}}};return _.each(n,
                            function(e){
                                if(_.isString(e.filter))e.isClass=function(r){
                                    return e.filter.indexOf(r)>=0};
                                else if(_.isRegExp(e.filter))e.isClass=
                                    function(r){
                                        return e.filter.test(r)};
                                else{if(!_.isFunction(e.filter))throw new TypeError("Character class filter must be a string, Regexp or function. It's "+e.filter.toString());e.isClass=e.filter}}),i}),define("js/_validatr/validatr/validatr.types",["js/_password/entropyCalculator"],
                                function(e){
                                        var r={presenceOf:function(e){return _.isUndefined(e)||_.isNull(e)||_.isNaN(e)?!1:_.isString(e)||_.isArray(e)?e.length>0:!0}
                                ,passwordFormat:function(r){
                                        return e(r)>=42},isEmail:
                                            function(e){
                                                var r=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|biz|info|name|aero|biz|info|jobs|museum)\b/;return"string"==typeof e?r.test(e):!1},isNumber:function(e){return"number"!=typeof e||_.isNaN(e)?"string"==typeof e?/\d/.test(e)&&/^\d*\.?\d*$/.test(e):!1:!0},inRange:function(e,r){return e>=r.min&&r.max>=e},greaterThan:function(e,r){return e>r.min},greaterThanOrEqualTo:function(e,r){return e>=r.min},lessThan:function(e,r){return r.max>e},lessThanOrEqualTo:function(e,r){return r.max>=e}};return r}),define("js/_validatr/validatr/validatr",["./validatr.types"],function(e){function r(e){var r=$(e),a={};_.each(r.serializeArray(),function(e){("string"!=typeof e.value||0!==e.value.length)&&(a[e.name]=e.value)}),t.call(this,a)}function t(e){_.each(i.call(this,e),function(r){e[r]=void 0}),_.each(e,_.bind(function(r,t){a.call(this,t,r,e)},this))}function a(e,r,t){var a=p.prototype.getValidations.call(this,e);_.each(a,_.bind(function(e){var a;"string"==typeof e.validate?e.validate=n[e.validate]:_.isRegExp(e.validate)&&(a=e.validate,e.validate=function(e){return a.test(e)}),o.call(this,e,r,t)},this))}function o(e,r,t){if("undefined"!=typeof r||e.optional!==!0)try{e.validate.call(this,r,e,t)===!1&&this.errors.push(_.pick(e,"attribute","message"))}catch(a){this.errors.push({attribute:e.attribute,message:"Validation threw an exception. "+a})}}function i(e){var r=_.uniq(_.pluck(this.validations,"attribute")),t=_.uniq(_.keys(e));return _.difference(r,t)}function s(e){return"string"==typeof e.validate?"function"==typeof n[e.validate]:"function"==typeof e.validate||_.isRegExp(e.validate)}var n=e,l={attribute:"global",message:"Error",optional:!1},p=function(){this.validations=[],this.errors=[],this.isValidValue,_.isArray(arguments[0])&&_.each(arguments[0],_.bind(function(e){this.registerValidation(e)},this))};return _.extend(p.prototype,Backbone.Events),p.prototype.validate=function(e){var a=this;return a.errors=[],"object"==typeof e&&_.isArray(e)===!1?($(e).length>0&&$(e).first().is("form")?r.call(a,e):t.call(a,e),a.isValidValue=0>=a.errors.length):(a.errors.push({message:"Validation argument not an object."}),a.isValidValue=!1),a.trigger("validate",a.isValidValue,a.validationErrors()),a.isValidValue?a.trigger("validate:valid"):(a.trigger("validate:invalid",a.validationErrors()),_.each(a.validationErrors(),function(e,r){a.trigger("validate:invalid:"+r,e)})),a.isValidValue},p.prototype.registerValidation=function(e){s(e)&&(e=_.extend(_.clone(l),e),this.validations.push(e))},p.prototype.isValid=function(){return this.isValidValue},p.prototype.getValidations=function(e){return _.where(this.validations,{attribute:e})},p.prototype.validationErrors=function(){var e={};return _.each(this.errors,function(r){_.isArray(e[r.attribute])===!1&&(e[r.attribute]=[]),e[r.attribute].push(r.message)}),e},p.prototype.getErrors=function(){return this.errors},p}),define("js/_validatr/formDecorator/formDecorator.decorators",[],function(){var e={defaultDecorator:"afterField",defaults:function(){return this[this.defaultDecorator]},afterField:function(e,r){var t,a="<span class='error messages'>";return _.each(r,function(e){a+="<span class='message'>",a+=e,a+="</span>"}),a+="</span>",t=$(a),e.$element.after(t),e.$element.addClass("error"),$('label[for="'+e.$element.attr("id")+'"]').addClass("error"),function(){e.$element.removeClass("error"),$('label[for="'+e.$element.attr("id")+'"]').removeClass("error"),t.remove()}},beforeField:function(e,r){var t,a="<span class='error messages'>";return _.each(r,function(e){a+="<span class='message'>",a+=e,a+="</span>"}),a+="</span>",t=$(a),e.$element.before(t),e.$element.addClass("error"),$('label[for="'+e.$element.attr("id")+'"]').addClass("error"),function(){e.$element.removeClass("error"),$('label[for="'+e.$element.attr("id")+'"]').removeClass("error"),t.remove()}}};return e}),define("js/_validatr/formDecorator/formDecorator",["./formDecorator.decorators"],function(e){function r(){var e=this,r=$(e.config.form),t=$();r.is("form")&&(t=t.add(r.find(o))),"object"==typeof e.config.inputs&&(t=t.add($(e.config.inputs).filter(o)),t=t.add($(e.config.inputs).find(o))),t.each(function(){var r=$(this),t={attribute:e.attributeMapping[r.attr("name")]||r.data("validation-attribute")||r.attr("name")||r.attr("id"),$element:r,onBlur:e.config.onBlur,shouldDecorate:function(){return!(this.onBlur&&!this.hasFocused)},remove:function(){}};t.attribute&&e.fields.push(t)})}function t(){var e=this;$(e.form).on("submit",_.bind(a,e)),_.each(e.fields,function(r){r.onBlur&&r.$element.on("blur",function(){r.remove(),!e.validator.validate(e.form)&&e.validator.validationErrors()[r.attribute]&&(r.remove=e.decorate(r,e.validator.validationErrors()[r.attribute]))})})}function a(e){this.validator.validate(e.target)||(this.render(this.validator.validationErrors()),e.preventDefault())}var o="input, select, textarea",i=function(a){if(this.config=a||{},this.attributeMapping=this.config.attributeMapping||[],this.form=this.config.form,this.fields=[],this.validator=this.config.validator,this.form&&"object"!=typeof this.validator)throw"You must pass a validator if configuring a form.";"function"==typeof this.config.decorator?this.decorate=this.config.decorator:"string"==typeof this.config.decorator&&(this.decorate=e[this.config.decorator]),r.call(this,this.config),t.call(this)};return i.prototype.decorate=e.defaults(),i.prototype.render=function(e){_.each(this.fields,_.bind(function(r){var t=r.attribute;_.has(e,t)?(r.remove(),r.remove=this.decorate(r,e[t]),r.decorated=!0):this.clear(r)},this))},i.prototype.clear=function(e){var r=e||this.fields;_.isArray(r)||(r=[r]),_.each(r,function(e){e.remove(),e.decorated=!1})},i}),require(["js/_validatr/validatr/validatr","js/_validatr/formDecorator/formDecorator"],function(e,r){window.Validatr=e,window.FormDecorator=r}),define("js/_validatr/validatr.bootstrap",function(){}),!function(){function e(e,r){return e.write('<form class="passwordForm"><button class="passwordToggle">').reference(r._get(!1,["showHide"]),r,"h").write('</button><input class="password" type="').reference(r._get(!1,["visible"]),r,"h").write('" value="').reference(r._get(!1,["password"]),r,"h").write('" maxlength="100" placeholder="Enter new password" /></form>')}return dust.register("_password/form",e),e}(),function(){function e(e,r){return e.write('<div class="passwordForm"><label for="password">Password</label> | <a href="javascript:void(0)" class="passwordToggle">').reference(r._get(!1,["showHide"]),r,"h").write('</a><input name="password" id="password" class="password" type="').reference(r._get(!1,["visible"]),r,"h").write('" value="').reference(r._get(!1,["password"]),r,"h").write('" maxlength="').reference(r._get(!1,["maxLength"]),r,"h").write('" placeholder="Enter new password" /></div>')}return dust.register("_password/password",e),e}(),function(){function e(e,r){return e.write('<div class="strength-copy-wrapper ').reference(r._get(!1,["strengthClass"]),r,"h").write('">Password Strength: <span class="strength-copy">').reference(r._get(!1,["strengthCopy"]),r,"h").write('</span><div class="strength-meter-wrapper ').reference(r._get(!1,["strengthClass"]),r,"h").write('"><div class="strength-meter" id="strength" style="width: ').reference(r._get(!1,["level"]),r,"h").write('%"></div><div class="strength-hash hash-third"></div><div class="strength-hash hash-two-third"></div></div><div class="strength-hints">').reference(r._get(!1,["hint"]),r,"h").write("</div>")}return dust.register("_password/strength",e),e}(),define("dust/_password/_all",function(){}),define("js/_password/entropyCalculator",[],function(){function e(e){for(var t=[],a=0;e.length/3>a;a++)t[a]=r(e.slice(3*a,3*a+3));return t}function r(e){for(var r=0,t=0;e.length>t;t++)r+=e.charCodeAt(t)-32,r/=95;return r}function t(e){if("string"!=typeof e||e.length>1)throw new TypeError("char must be a single character string");for(var r in n)if(n.hasOwnProperty(r)&&n[r].isClass(e))return r}function a(e){for(var r=[],a=0;e.length>a;a++)r.push(t(e.charAt(a)));return r=_.uniq(r),_.reduce(r,function(e,r){return e+n[r].value},0)}function o(e){return e=e.charAt(0).toLowerCase(),"a">e||e>"z"?0:e.charCodeAt(0)-96}function i(r){var t,i,n,l,p,f;if("string"!=typeof r)throw new TypeError("entropyCalucator parameter must be a string");for(l=0,p=0,n=Math.log(a(r))/Math.log(2),l=o(r.charAt(0)),f=1;r.length>f;f++)i=o(r.charAt(f)),t=1-e(s)[27*l+i]||1,p+=n*t*t,l=i;return Math.max(p,n)}var s='gL6-A$A:#@\'$KT#<c"06"8*"Wb"5-$Kr t%#f+"S4$7;$ v!R=%!6 g@#s}&\'P#rM"a8"K\'!3= #V }o wx*bZ"X="De#2 #~B!dL!\\\\"(u qj#Pf L_"e (1K$9--x6 SE"x- .$)/s%rK(w""QV"oQ ;; {_ [| q@(8t-G7#nU MW cS2$9 UJ GH <]*#S !: >!\'kQ \\Z @A)O8 5& E (L""YZ r_&g2 66 ~& *L!n* zO,|Y)B8 V.#X: qI\'V0 B7 s@4<B)>= I-$wt!;A =h ?G+y: p/ |k"}} &w"]?#72 W) j$ @w S !I700V\'gf (Q cf!9{9cL Qa .i #Z, F *M NZ!0c RX!+%((N S$ ]o#hU#{o Z2#j_ 6P d% I!!wX _Z.nH!i.!@y!6T#a$"Yt ?]!kv Jl"]{ sh!2$&x~"5F.8X AF!n2 :A1G@(\'.%5} 24!TZ XY \\P zq G,).J)>} GD _o Xu*di&m0!%Q  L-KA @I ei%4P <S 8m+NI l& Gg&m+"nS$T{%&? YT e( Mu g2 ~., B(\\P N6 .d .M:^6 gg"]s"k2\':6 LU /h#k_ 6-#$3%p9 W$ 7x&)(%_-">[#Q8 VM y( 3q c* vn/va-K> ^N Il LQ/y9 qF *< /k+^O zp K;"bZ!M\\!>(*NW L\' .-#=<"Uz$^:$o? C] F\' /)"+) FC+8H$M&!l1&2\'#n"&K<!d-#"_ jw A{ J(#~e$Yi#(v.Ng#NF!V8 zM"Q4*RH&.X E""n; ^5 41 gM!xj("Q1![ bn #!";?1la yU mR A6)GK @="w5!k$!bX"b[)K-!R) Mq Fl&uz Zx&p\\ <A X\' f&!B_ xj)GW.3F <G *5 .e-}6 (6 C-!U>)S< :r#=;#:C 9Q!xJ,7< w" Tp#*1%|F#Ze&JW Dn /$ ]("4( H{&>!.@h W[ .F"G}/#k :_ ,U ;$04E \\,!/P)h9!Hq f4( f S& 18 M^":\'#w|#]o 7= !# Y]"*4 YZ-<E0$]"B^ QO bn/$G )> zO e>-|+ \\? SY (d$nj b%)p+%aQ 2P oa!U\\ mp$x: S: *$ &.!9( 3-3KD&WW WG"jB\'`),:t I<\'T_ I=($C Pd!;M 5I 3a"h %_G $, .E (_%wZ(WC!*] w> "$ s} WT h;*Kd UY!JW")u",)"v6!AU"Mv RS"hZ "("Ya&e/%5S-w\\"/W#b1 lF*fp%a6$3c$aH#uf!e> cH!]v 58*En+r< Ic v< gh,&\\ +A ;a$2!)I. !8 :w$>E 2Q fH+LA$)$ Gl+NL"y9"43$30 "8 d% 8l u% cV$pm 6C 2O uH .S K@ $= DB B(!f6 =9 <R *I uH A@ dG )A `K NX 3L !sopL %: o1 h0 9/ (U(5?-Q8!&=!iX"f(0\\[ ~V!ii )\\,<? 2W!l*!}#"\\8#NX)pn S0 Iv!{M$Rs#A2#s"!$R k& ]J!Yi {#4jR%m` --$\\D ;(*>X ]K lS"H~\'c; ;K#hP!/^!(l !S#z+##d [H F\\%Z3/b-#)f /O c% 66!YO 2w+{3,}? {N I1  O3^6 !? xV"s5-3I `R wn (E wj Kq\';: KA XU&_\'#b|$<N$2C qX w# iu!yO Fr($1"T@"pg"eA#+3\'g<!w$":w `7$\\ !Z)#qf%I4%$x*pf!kN"/* T9(Z])+?&O5"9"!nP 2< {9 5q R-\'0~5)4 ^= j8 us9#/ @1 }3 Ul0+- U6 *K!&? +K!]p()0 Z$ va!e} Y< fl!rQ *) C( KJ#f4 $;\'v.5aO W` w*!A<0IC yG ru!KR-*/ 
                                                /*<\\ ,-!&3!Ap&Jc\'+` V& s5"gB$gF!`>!B0 hO g. ;w"I5 |v7:@&:o %h#zz H"(wx tL rk!q\\*w9 {D Q-!T_!lF!O$%vF&cB 8 "Mp!SZ\'he!HP rq!>N"BA"Y3 wR8^U$.~ ee#K[";,#IZ ;f!KI!eE!XQ d-#s/$JY%Pz%/F$+Y#2$ XX#Ez\'5g$z9"9$!1y vB 51!La @T*\\f0)j ek L3!^@1t- II Zn m@,08 )0!-@!<-! |"Fp&Oj A& N_ U[ P>!-h$D` 3a!K\' `d#uc%',n={lowerCase:{value:26,filter:/[a-z]/},upperCase:{value:26,filter:/[A-Z]/},digit:{value:10,filter:/\d/},digitSymbol:{value:10,filter:"!@#$%^&*()"},otherSymbol:{value:10,filter:"`~-_=+[]{}\\|;:'\",<.>/?"},space:{value:1,filter:" "},extendASCII:{value:160,filter:function(e){return 32>e.charCodeAt(0)||e.charCodeAt(0)>126}}};return _.each(n,function(e){if(_.isString(e.filter))e.isClass=function(r){return e.filter.indexOf(r)>=0};else if(_.isRegExp(e.filter))e.isClass=function(r){return e.filter.test(r)};else{if(!_.isFunction(e.filter))throw new TypeError("Character class filter must be a string, Regexp or function. It's "+e.filter.toString());e.isClass=e.filter}}),i}),define("js/_password/config",[],function(){return{thresholds:{acceptable:42,strong:60,max:80},strengthCopy:{empty:"Enter A Password",weak:"Not Strong Enough",acceptable:"Acceptable",strong:"Strong"},hints:{empty:"To create a strong password, try using a sentence with spaces, letters, numbers, and special characters.",weak:"To create a strong password, try using a sentence with spaces, letters, numbers, and special characters.",acceptable:"To create a strong password, try using a sentence with spaces, letters, numbers, and special characters.",strong:""}}}),define("js/_password/passwordMeter",["require","dust/_password/_all","./entropyCalculator","./config"],function(e){e("dust/_password/_all");var r=e("./entropyCalculator"),t=e("./config"),a=function(e){this.config=t,"object"==typeof e&&"object"==typeof e.field&&this.setField(e.field),this.$el=$("<div>"),this.el=this.$el.get(0),this.update(),this.render(),"object"==typeof Backbone&&_.extend(this,Backbone.Events)};return a.prototype.render=function(){var e={strengthCopy:this.config.strengthCopy[this.strength],hint:this.config.hints[this.strength],strengthClass:this.strength,level:this.level};return dust.render("_password/strength",e,_.bind(function(e,r){this.$el.html(r)},this)),this},a.prototype.setField=function(e){var r=$(e).first();if(0===r.length||!r.is("input, textarea"))throw new TypeError("'field' must be a form field element");r.on("blur",_.bind(onFieldChange,this)),r.on("paste",_.bind(onFieldChange,this)),r.on("keyup",_.bind(onFieldChange,this))},a.prototype.update=function(e){e=e||"",this.entropy=r(e)||0,this.strength=_.bind(passwordClass,this)(),this.level=_.bind(calculateLevel,this)(),this.render(),"function"==typeof this.trigger&&this.trigger("change",meter,e)},passwordClass=function(){var e;return 0===this.entropy?e="empty":this.entropy<this.config.thresholds.acceptable?e="weak":this.entropy<this.config.thresholds.strong?e="acceptable":this.entropy>=this.config.thresholds.strong&&(e="strong"),e},calculateLevel=function(){var e=this.entropy,r=this.config.thresholds.acceptable,t=this.config.thresholds.strong,a=this.config.thresholds.max;return 100*Math.min(Math.min(e,r)/r/3+Math.max((e-r)/(t-r),0)/3+Math.max((e-t)/(a-t),0)/3,1)},onFieldChange=function(e){this.update(e.target.value)},a}),require(["js/_password/passwordMeter"]),define("js/_password/passwordMeterBootstrap",function(){}),require(["js/_password/passwordMeter"],function(e){$(function(){var r,t,a=$('[data-strength-meter="true"]');a.length>0&&(meter=new e({field:a}),a.after(meter.el));try{$('<input type="password" />').detach().attr("type","text"),r=$('[data-showable="true"]'),t=$('<a href="javascript:void(0);" class="passwordToggle">Show Password</a>'),$label=$("label[for="+r.attr("id")+"]"),1>$label.length&&($label=r.siblings("label").last()),$label.append(" | "),$label.append(t),t.click(function(){var e;"password"===r.attr("type")?(e=$('<div style="display: none">'),r.after(e).detach(),r.attr("type","text"),e.before(r).remove(),$(this).html("Hide Password")):(e=$('<div style="display: none">'),r.after(e).detach(),r.attr("type","password"),e.before(r).remove(),$(this).html("Show Password"))})}catch(o){}})});
*/

//password validation END