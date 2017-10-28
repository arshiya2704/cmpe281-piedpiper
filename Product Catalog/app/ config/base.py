"""
    Base Configuration File
"""
""" Generic Configurations """
class Config(object):
    DEBUG = False
    TESTING = False
    SECRET_KEY = 'someSecretKey'

""" Development Specific Configurations """
class DevelopmentConfig(Config):
    DEBUG = True

""" Staging Specific Configurations """
class StagingConfig(Config):
    TESTING = True

""" Production Specific Configurations """
class ProductionConfig(Config):
    pass
