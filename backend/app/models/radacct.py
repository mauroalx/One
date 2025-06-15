from sqlalchemy import DateTime, BigInteger
from sqlalchemy import Column, Integer, String
from app.models.base import Base

class RadAcct(Base):
    __tablename__ = "radacct"

    radacctid = Column(BigInteger, primary_key=True)
    acctsessionid = Column(String(64))
    acctuniqueid = Column(String(32), unique=True)
    username = Column(String(64))
    realm = Column(String(64))
    nasipaddress = Column(String(15))
    nasportid = Column(String(15))
    nasporttype = Column(String(32))
    acctstarttime = Column(DateTime)
    acctstoptime = Column(DateTime)
    acctsessiontime = Column(Integer)
    acctauthentic = Column(String(32))
    connectinfo_start = Column(String(32))
    connectinfo_stop = Column(String(32))
    acctinputoctets = Column(BigInteger)
    acctoutputoctets = Column(BigInteger)
    calledstationid = Column(String(50))
    callingstationid = Column(String(50))
    acctterminatecause = Column(String(32))
    servicetype = Column(String(32))
    framedprotocol = Column(String(32))
    framedipaddress = Column(String(15))
