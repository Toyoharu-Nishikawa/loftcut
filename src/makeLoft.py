#FREECADPATH = r"C:\Program Files\FreeCAD 0.19\bin"
#MODPATH = r"C:\Program Files\FreeCAD 0.19\Mod"
#LOCALMODPATH = r"C:\Users\toyoh\AppData\Roaming\FreeCAD\Mod"

#import sys
#sys.path.append(FREECADPATH)
#sys.path.append(MODPATH)
#sys.path.append(LOCALMODPATH)

import FreeCAD as App
#from FreeCAD import Base
#import CurvedShapes
import Draft
import Part
import os
import json
import shutil
import time

ori = os.path.dirname(os.path.abspath(__file__))
tmpDir = "./tmp"



class MakeLoft:
    def __init__(self):
        self.doc = App.newDocument("Unnamed")
        self.config = {"offset":2, "offsetFlag":True}

    def readFile(self, inputFileName):
        self.inputFileName = inputFileName
        json_open = open(self.inputFileName, 'r')
        self.sections = json.load(json_open)
        json_open.close()
    
    
    def importSections(self, sections):
        self.sections = sections 

    def setConfig(self, config):
        self.config = config
    
    
    def makeSec(self, sec, reverseFlag=False):
        pl = App.Placement()
        pl.Rotation.Q = (0.0, 0.0, 0.0, 1.0)
        pl.Base = App.Vector(0.0, 0.0, 0.0)
    
    
        points = [App.Vector(v[0], v[1], v[2]) for v in sec]
        if reverseFlag:
            newP = list(reversed(points))
        else:
            newP = points
        wire= Draft.makeWire(newP, placement=pl, closed=True, face=True, support=None)
        #wire= Draft.makeBSpline(newP, placement=pl, closed=True, face=True, support=None)
        Draft.autogroup(wire)
        return wire
    
    
    def makeBottomAndTopSections(self):
        sections = self.sections
        offset = self.config["offset"]

        bottomCurve = sections[0]
        topCurve = sections[-1]
        
        
        
        bottomZlist = [v[2] for v in bottomCurve]
        bottomZmin = min(bottomZlist)
        addedBottom = [[v[0],v[1],bottomZmin-offset] for v in bottomCurve]
        
        topZlist = [v[2] for v in topCurve]
        topZmax = max(topZlist)
        addedTop = [[v[0],v[1],topZmax+offset] for v in topCurve]
        
        addedSections = [addedBottom] + sections + [addedTop]
        self.addedSections = addedSections
    
    
    def makeLoft(self):
        addedSections = self.addedSections if self.config["offsetFlag"] else self.sections
        wires = [self.makeSec(v) for v in addedSections]
#        comp = self.doc.addObject("Part::Compound","Compound")
#        comp.Links =wires
      
      
        loft = self.doc.addObject('Part::Loft','Loft')
        loft.Sections=wires
        loft.Solid=True
        loft.Ruled=True
        loft.Closed=False
    
    
    def saveAs(self, exportFileName):
        self.exportFileName = exportFileName
        self.doc.recompute()
        self.doc.saveAs(self.exportFileName)

    def close(self):
        App.closeDocument(self.doc.Name)

    def run(self):
        self.makeBottomAndTopSections()
        self.makeLoft()

    def getFileText(self, removeFlag=True):
        self.doc.recompute()
        
        ut = str(time.time())
        savePath = os.path.join(ori, tmpDir, ut)
        os.mkdir(savePath)
        
        exportFileName = ut + ".FCStd"
        exportFullPath = os.path.join(savePath,exportFileName)
        self.saveAs(exportFullPath)
        with open(exportFullPath,"rb") as f:
            s = f.read()

        if(removeFlag):
            shutil.rmtree(savePath)

        return s 

def makeLoftCAD(sections2):
    Loft = MakeLoft()
    Loft.importSections(sections2)
    Loft.run()
    text = Loft.getFileText(removeFlag=True)
    Loft.close()
    return text


def main():
    dir = os.path.dirname(os.path.abspath(__file__))
    inputFileName = "coordinates.json"
    exportFileName = "test.FCStd"
#   inputFullPath = os.path.join(dir, inputFileName)
#   exportFullPath = os.path.join(dir, exportFileName)
#   config = {
#      "offset": 2,
#      "offsetFlag": True
#   }
#
#   Loft = MakeLoft()
#   Loft.readFile(inputFileName)
#   Loft.setConfig(config)
#   Loft.run()
#   Loft.saveAs(exportFileName)

    json_open = open(inputFileName, 'r')
    sections2 = json.load(json_open)
    json_open.close()
    loft = makeLoftCAD(sections2)
    with open("test2.FCStd","wb") as f:
      f.write(loft)

if(__name__=="__main__"):
    main()
