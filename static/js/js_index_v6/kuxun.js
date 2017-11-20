var kuxun = (function() {
    var EncodeUtf8 = function(s1) {
        var s = escape(s1);
        var sa = s.split("%");
        var retV = "";
        if (sa[0] != "") {
            retV = sa[0]
        }
        for (var i = 1; i < sa.length; i++) {
            if (sa[i].substring(0, 1) == "u") {
                retV += Hex2Utf8(Str2Hex(sa[i].substring(1, 5)))
            } else retV += "%" + sa[i]
        }
        return retV
    }
    window.EncodeUtf8 = EncodeUtf8;
    var Str2Hex = function(s) {
        var c = "";
        var n;
        var ss = "0123456789ABCDEF";
        var digS = "";
        for (var i = 0; i < s.length; i++) {
            c = s.charAt(i);
            n = ss.indexOf(c);
            digS += Dec2Dig(eval(n))
        }
        return digS
    }
    var Dec2Dig = function(n1) {
        var s = "";
        var n2 = 0;
        for (var i = 0; i < 4; i++) {
            n2 = Math.pow(2, 3 - i);
            if (n1 >= n2) {
                s += '1';
                n1 = n1 - n2
            } else s += '0'
        }
        return s
    }
    var Dig2Dec = function(s) {
        var retV = 0;
        if (s.length == 4) {
            for (var i = 0; i < 4; i++) {
                retV += eval(s.charAt(i)) * Math.pow(2, 3 - i)
            }
            return retV
        }
        return - 1
    }
    var Hex2Utf8 = function(s) {
        var retS = "";
        var tempS = "";
        var ss = "";
        if (s.length == 16) {
            tempS = "1110" + s.substring(0, 4);
            tempS += "10" + s.substring(4, 10);
            tempS += "10" + s.substring(10, 16);
            var sss = "0123456789ABCDEF";
            for (var i = 0; i < 3; i++) {
                retS += "%";
                ss = tempS.substring(i * 8, (eval(i) + 1) * 8);
                retS += sss.charAt(Dig2Dec(ss.substring(0, 4)));
                retS += sss.charAt(Dig2Dec(ss.substring(4, 8)))
            }
            return retS
        }
        return ""
    }
    return {
        stringToDate: function(string) {
            var matches;
            if (matches = string.match(/^(\d{4,4})-(\d{1,2})-(\d{1,2})$/)) {
                return new Date(matches[1], parseInt(matches[2]) - 1, matches[3])
            } else {
                return null
            }
        },
        FlyTicket: function() {
            var _q = document.getElementById("FlyStar").value;
            var _k = document.getElementById("FlyEnd").value;
            var _d = document.getElementById("FlyDate").value;
            var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=20";
            if (_q == '') {
                document.getElementById("FlyStar").focus();
                return
            } else {
                _q = EncodeUtf8(EncodeUtf8(_q))
            }
            if (_k == '') {
                document.getElementById("FlyEnd").focus();
                return
            } else {
                _k = EncodeUtf8(EncodeUtf8(_k))
            }
            if (_d == '') {
                document.getElementById("FlyDate").focus();
                return
            }
            _kw += "&StartCity=" + _q + "&DestCity=" + _k + "&DepartDate=" + _d + "&sid=1250&allianceid=1112&FlightWay=0";
            window.open(_kw)
        },
        SearchHotel: function() {
            var _q = document.getElementById("HotelCity").value;
            var _k = document.getElementById("HotelName").value;
            var _d = document.getElementById("HotelDate").value;
            var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=10";
            if (_q == '') {
                document.getElementById("HotelCity").focus();
                return
            } else {
                _q = EncodeUtf8(EncodeUtf8(_q))
            }
            if (_k == '') {
                document.getElementById("HotelName").focus();
                return
            } else {
                _k = EncodeUtf8(EncodeUtf8(_k))
            }
            if (_d == '') {
                document.getElementById("HotelDate").focus();
                return
            } else {
                _d = EncodeUtf8(EncodeUtf8(_d))
            }
            _kw += "&CityName=" + _q + "&CheckInDate=" + _d + "&CheckOutDate=" + _d + "&HotelName=" + _k + "&sid=1250&allianceid=1112";
            window.open(_kw)
        },
        TrainTicket: function() {
            var S_place = document.getElementById("TrainStar").name;
            var E_place = document.getElementById("TrainEnd").name;
            var s_place = document.getElementById("TrainStar").value;
            var e_place = document.getElementById("TrainEnd").value;
            var o_date = document.getElementById("TrainDate").value;
            var _kw = "http://u.ctrip.com/union/CtripRedirect.aspx?TypeID=2&AllianceID=1112&sid=724217&jumpUrl=http%3a%2f%2ftrains.ctrip.com%2fTrainBooking%2fSearch.aspx%3f";
            var td = new Date(_today_y, _today_m, _today_d);
            if (s_place == '') {
                document.getElementById("TrainStar").focus();
                return
            } else {
                s_place = escape(s_place)
            }
            if (e_place == '') {
                document.getElementById("TrainEnd").focus();
                return
            } else {
                e_place = escape(e_place)
            }
            if (o_date == '') {
                document.getElementById("TrainDate").focus();
                return
            }
            var d = kuxun.stringToDate(o_date);
            var n = d - td;
            n = n / (24 * 60 * 60 * 1000) + 1;
            _kw += "from%3d" + S_place + "%26to%3d" + E_place + "%26day%3d" + n + "%26number%3d%26fromCn%3d" + s_place + "%26toCn%3d" + e_place;
            window.open(_kw);
        },
        tuniuTicket:function(){
            var s_place = document.getElementById("tuniuStar").value;
            var e_place = document.getElementById("tuniuEnd").value;
            var o_date = document.getElementById("tuniuDate").value;
            var _kw = "http://www.tuniu.com/zt/flight/blank/?";
            if (s_place == '' || s_place == '出发城市' || e_place == '' || e_place == '目的城市' || o_date == '' || o_date == '出发日期' || s_place == e_place || Browser.isIE=="6.0") {
                window.open("http://www.tuniu.com/flight/?p=25233");
                return;
            }
            _kw += "departName=" + s_place + "&destName=" + e_place + "&departDate=" + o_date + "&p=25233&clearcache=1";
            window.open(_kw);
        }
    }
})();