import logging

logger = logging.getLogger(__name__)

class SentrySetup:
    """
    Sentry SDK initialization hook for error tracking.
    In production, set SENTRY_DSN environment variable and this runs at startup.
    """

    @staticmethod
    def init(dsn: str = None):
        if dsn:
            try:
                import sentry_sdk
                sentry_sdk.init(
                    dsn=dsn,
                    traces_sample_rate=0.2,
                    profiles_sample_rate=0.1,
                )
                logger.info(f"[Sentry] Initialized with DSN (error tracking active)")
            except ImportError:
                logger.warning("[Sentry] sentry_sdk not installed, skipping.")
        else:
            logger.info("[Sentry] No DSN provided, running without error tracking.")
