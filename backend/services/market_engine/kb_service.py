import chromadb
from chromadb.utils import embedding_functions
import os
import json
import logging
from typing import List, Dict, Any, Optional

logger = logging.getLogger(__name__)

class KnowledgeBaseService:
    def __init__(self, persist_directory: str = "./data/chroma"):
        self.persist_directory = persist_directory
        os.makedirs(persist_directory, exist_ok=True)
        
        self.client = chromadb.PersistentClient(path=persist_directory)
        
        # Using a standard, lightweight embedding function
        self.embedding_fn = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="all-MiniLM-L6-v2"
        )
        
    def get_collection(self, industry: str):
        collection_name = f"{industry.lower().replace(' ', '_')}_knowledge"
        return self.client.get_or_create_collection(
            name=collection_name, 
            embedding_function=self.embedding_fn
        )

    def ingest_data(self, industry: str, data_points: List[Dict[str, Any]]):
        """
        Ingests a list of data points into the vector database.
        Each data point should have text, metadata, and an id.
        """
        collection = self.get_collection(industry)
        
        ids = [dp.get("id") for dp in data_points]
        documents = [dp.get("text") for dp in data_points]
        metadatas = [dp.get("metadata", {}) for dp in data_points]
        
        collection.upsert(
            ids=ids,
            documents=documents,
            metadatas=metadatas
        )
        logger.info(f"Ingested {len(ids)} documents into {industry} collection.")

    def query_knowledge(self, industry: str, query_text: str, n_results: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieves relevant context for a given query.
        """
        collection = self.get_collection(industry)
        results = collection.query(
            query_texts=[query_text],
            n_results=n_results
        )
        
        formatted_results = []
        if results and results['documents']:
            for i in range(len(results['documents'][0])):
                formatted_results.append({
                    "text": results['documents'][0][i],
                    "metadata": results['metadatas'][0][i] if results['metadatas'] else {},
                    "distance": results['distances'][0][i] if results['distances'] else 0
                })
        
        return formatted_results

kb_service = KnowledgeBaseService()
