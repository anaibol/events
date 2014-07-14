import warnings
import time
import sys
import xml.etree.ElementTree as ET
import os
import shutil
import datetime
import time
from subprocess import call
import sys, os, tempfile, logging
import urllib2, cookielib
import urllib
import urlparse
from optparse import OptionParser
import re
from os import listdir
from os.path import isfile, join
import sqlite3



parser = OptionParser();
parser.add_option("-f", "--filename", action="store", dest="filename", type="string", default="", help=" where to read the data ");
parser.add_option("-v", "--verbose",  action="store_true", dest="verbose", default=0, help="To display more information ");
parser.add_option("-l", "--limit", action="store", dest="limit", default=0, help=" numboer of line to process, default 0 means no limit ");
parser.add_option("-u", "--url", action="store", dest="url", type="string", default="", help=" url from 3rd party where go get html pages with fb events ");

(options, args) = parser.parse_args()

verbose = options.verbose
filename = options.filename
limit = int(options.limit)

i = 0

#uvzt9uzg.default
cookiePathMoilerat="/Users/moilerat/Library/Application Support/Firefox/Profiles/d9xv937r.dev/cookies.sqlite"
sessionIdMoilerat="s%3AHN6W4dfEcz9gxf6KSt9EJyCf.E1fZgvRz8laP04RhtYbdZ6Tjem%2BVH%2FOmrXrZTGLKzkM"
#s%3ASBAFRz8MlSDQr3DRYgAaPieg.4UJ3iSVyjng4kcm8sc5T5VEQ9taM66F0rT3EjBehHN0"
 
def get_cookies(cj, ff_cookies):
    con = sqlite3.connect(ff_cookies)
    cur = con.cursor()

    cur.execute("SELECT * FROM moz_cookies WHERE baseDomain like '%wooepa%' ")
    for item in cur.fetchall():
        print item


#    cur.execute("SELECT DISTINCT baseDomain FROM moz_cookies ")
#    for item in cur.fetchall():
#        print item[0]

    cur.execute("SELECT host, path, isSecure, expiry, name, value FROM moz_cookies WHERE baseDomain like '%wooepa%' ")
    for item in cur.fetchall():
        c = cookielib.Cookie(0, item[4], item[5],
            None, False,
            item[0], item[0].startswith('.'), item[0].startswith('.'),
            item[1], False,
            item[2],
            item[3], item[3]=="",
            None, None, {})
        print c
        cj.set_cookie(c)

def add_session_id(cj, session_id):
    c = cookielib.Cookie(0, "connect.sid", session_id,
            None, False,
            "wooepa.com", False, False,
            "/", False,
            False,
            None, False,
            None, None, {})
    print c
    cj.set_cookie(c)

def loadUrlWithCookie(url) :
  try :
    txheaders =  {'User-agent' : 'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT)'}

    #cj = cookielib.MozillaCookieJar(cookiePathMoilerat)
    #cj.load()

    cj = cookielib.LWPCookieJar()
    #get_cookies(cj, cookiePathMoilerat)
    add_session_id(cj, sessionIdMoilerat)
    
    opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(cj))
    urllib2.install_opener(opener)

    req = urllib2.Request(url, None, txheaders)
    handle = urllib2.urlopen(req)
    print handle.read()
  except Exception ,e :
    print " Error loading url " + str(e)


def get_fb_id_from_links_in_lines(lines) :
    for line in lines :
        m_info_get_url_id_facebook = re.search(r"(facebook\.com\/events/([0-9]+))", line)

        if (m_info_get_url_id_facebook) :
            #print " FOUND : " + line

            url = m_info_get_url_id_facebook.group(1)
            id = m_info_get_url_id_facebook.group(2)
            print " FOUND : " + id

            url = "http://wooepa.com/import/event/" + id
            if verbose : 
                print url
            print "Loading url : " + url
            loadUrlWithCookie(url)
#            try :
#                data = urllib.urlopen(url)
#                print data.read()
#            except Exception ,e :
#                print " Error loading url " + str(e)
        else :
            sys.stdout.write(",")
            sys.stdout.flush()

    print "DPT FINISHED"

if filename != "" :
    with open(filename, 'r') as f:
        lines = f.readlines()
    get_fb_id_from_links_in_lines(lines)
    print "WE SHOULD EXIT HERE !?!?!"
else :
    data = urllib.urlopen(options.url)
    lines = []
    for line in data :
        i = i + 1
        if (limit > 0 and i > limit) :
            break

        m_info_timestamp = re.search(r"(([0-9]{2})\/([A-Z][a-z]{2})\/([0-9]{4}):([0-9]{2}):([0-9]{2}):([0-9]{2}))", line)

#        m_info_get_url = 
        # just facebook VR 28-4-14
        #m_info_get_url_id_facebook = re.search(r"(facebook)", line)
#"(\.)"
        m_info_get_url_id_facebook = re.search(r"(/index\.php/dpt/[0-9]{2})", line)
        # m_info_get_url_id_facebook = re.search(r"(/index\.php/([A-Z]{1}[a-z]+))", line) 
#https://www.facebook.com/events/531327140280680/

        #print line

        #if (m_info_photo_id_tag and m_info_timestamp) :
        if (m_info_get_url_id_facebook) :
            print " FOUND : " + line
            #ids = m_info_photo_id_tag.group(1)
            #tags = m_info_photo_id_tag.group(2)

            url = m_info_get_url_id_facebook.group(1)
            print " FOUND : " + url

            # ici on va dans le fichier sous jacent
            url = "http://salsa.faurax.fr" + url 

            print " LOADING LINE FROM :" + url

            data2 = urllib.urlopen(url)
            lines2 = []
            for l in data2 :
                lines2.append(l)
            print "Calling get_fb_id_from_links_in_lines with " + str(len(lines2)) + " ! "
            get_fb_id_from_links_in_lines(lines2)

        else :
            sys.stdout.write("-")
            sys.stdout.flush()
            #print "NOT Found : " + line


