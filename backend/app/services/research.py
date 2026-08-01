"""
ResearchService — Business Logic

Phase 2 Responsibilities:
- Receives search requests from the router
- Coordinates the ProviderRegistry to fetch data from multiple sources
- Runs Normalizer, Deduplicator, and RankingEngine
- Returns the final SearchResponse
"""

from typing import Any
import logging

from app.research.registry import ProviderRegistry
from app.research.normalizer import Normalizer
from app.research.deduplicator import Deduplicator
from app.research.ranking import RankingEngine
from app.schemas.research import SearchResponse

logger = logging.getLogger(__name__)

class ResearchService:
    """
    Research domain service.
    
    Injected via FastAPI Depends() in the research router.
    """
    def __init__(self):
        self.registry = ProviderRegistry()
        self.normalizer = Normalizer()
        self.deduplicator = Deduplicator()
        self.ranking = RankingEngine()

    async def search_papers(self, query: str, limit: int = 20, source_filter: str | None = None) -> SearchResponse:
        """
        Execute a federated search across all active providers, normalize, deduplicate, and rank.
        """
        logger.info(f"Executing search for query: '{query}', limit={limit}, source={source_filter}")
        
        # 1. Fetch from providers
        raw_papers = await self.registry.search_all(query=query, limit_per_provider=limit, source_filter=source_filter)
        
        # 2. Normalize
        normalized_papers = self.normalizer.normalize_list(raw_papers)
        
        # 3. Deduplicate
        unique_papers = self.deduplicator.deduplicate(normalized_papers)
        
        # 4. Rank
        ranked_papers = self.ranking.rank(unique_papers, query)
        
        # Return paginated response (simplified for Phase 2)
        # In a real system, we'd need a cursor or offset pagination strategy across heterogeneous providers
        return SearchResponse(
            papers=ranked_papers[:limit], # Enforce final limit
            total=len(ranked_papers),
            page=1,
            has_more=len(ranked_papers) > limit
        )
