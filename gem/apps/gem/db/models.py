# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
#
# engine = create_engine('postgresql://gem:1@gem-db:5432/gem_db')
# Session = sessionmaker(bind=engine)
#
# Base = declarative_base()
# Base.metadata.create_all(engine)

# class User(Base):
#     __tablename__ = 'user'
#     # Here we define columns for the table person
#     # Notice that each column is also a normal Python instance attribute.
#     id = Column(Integer, primary_key=True)
#     username = Column(String(250), nullable=False)
#     full_name = Column(String(250), nullable=True)
#     email = Column(String(50), nullable=False)
#     hashed_password = Column(String(50), nullable=False)
