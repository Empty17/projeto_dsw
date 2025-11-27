package com.projeto.dsw.gerenciador_produtos.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.dsw.gerenciador_produtos.model.Produto;


    
    @Repository
    public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    }
