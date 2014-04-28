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
import urllib2
import urllib
import urlparse
from optparse import OptionParser
import re
from os import listdir
from os.path import isfile, join

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

if filename != "" :
    with open(filename, 'r') as f:
        lines = f.readlines()
else :
    data = urllib.urlopen(options.url)
    lines = data.read()

# ca c'est parce que je suis parresseux et ne veut pas ramener toutes les lignes du bas sur la gauche
if 1 :
    #while (line = f.read()) :
    for line in lines :
        i = i + 1
        if (limit > 0 and i > limit) :
            break

        m_info_timestamp = re.search(r"(([0-9]{2})\/([A-Z][a-z]{2})\/([0-9]{4}):([0-9]{2}):([0-9]{2}):([0-9]{2}))", line)


#        m_info_get_url = 
        # just facebook VR 28-4-14
        #m_info_get_url_id_facebook = re.search(r"(facebook)", line)
#"(\.)"
        m_info_get_url_id_facebook = re.search(r"(facebook\.com\/events/([0-9]+))", line)
#https://www.facebook.com/events/531327140280680/

        #if (m_info_photo_id_tag and m_info_timestamp) :
        if (m_info_get_url_id_facebook) :
            print " FOUND : " + line
            #ids = m_info_photo_id_tag.group(1)
            #tags = m_info_photo_id_tag.group(2)

            url = m_info_get_url_id_facebook.group(1)
            id = m_info_get_url_id_facebook.group(2)
            print " id : " + id

      #      date_string = m_info_timestamp.group(1)

      #      date_tagged = datetime.datetime.strptime(date_string, '%d/%b/%Y:%H:%M:%S')

#            day = m_info_timestamp.group(1)
#            month = m_info_timestamp.group(2)
#            year = m_info_timestamp.group(3)
#            hour = m_info_timestamp.group(4)
#            minute = m_info_timestamp.group(5)
#            second = m_info_timestamp.group(6)

            #lastModifiedDate = datetime.datetime.strptime(date_string, '%a, %d %b %Y %H:%M:%S %Z')

            url = "http://wooeva.com/import/event/" + id
# + "&timestamp=" + date_tagged.strftime("%Y-%m-%d") + "+" + date_tagged.strftime("%H:%M:%S")
            if verbose : 
                print url
            print "Loading url : "
            data = urllib.urlopen(url)
            print data.read()
            #if verbose :
            #    print data.read()
#            print "."
        else :
            sys.stdout.write(",")
            sys.stdout.flush()
            #print "NOT Found : " + line


