from os import getenv

DB_USER = getenv("GEM_DB_USER", "gem")
DB_PASSWORD = getenv("GEM_DB_PASSWORD", "1")
DB_HOST = getenv("GEM_DB_HOST", "localhost")
DB_PORT = getenv("GEM_DB_PORT", "5432")
DB_NAME = getenv("GEM_DB_NAME", "gem_db")

DATABASE_URI = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
