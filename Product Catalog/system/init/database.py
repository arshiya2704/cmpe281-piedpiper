from system.db.db_init import init_db
from app.config import database as database_config
# import sqlalchemy

def initialize_db(app):
  init_db(app)

def _get_config(env):
    return {
        'DEVELOPMENT': database_config.DevelopmentDBConfig,
        'STAGING': database_config.StagingDBConfig,
        'PRODUCTION': database_config.ProductionDBConfig,
    }.get(env, database_config.DevelopmentDBConfig)


