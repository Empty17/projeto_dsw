package com.projeto.dsw.gerenciador_produtos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String nome;

    @NotBlank(message = "Fabricante é obrigatório")
    @Size(max = 100, message = "Fabricante deve ter no máximo 100 caracteres")
    private String fabricante;

    @NotNull(message = "Preço é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço deve ser maior que zero")
    private Double preco;

    @NotNull(message = "Quantidade é obrigatória")
    @Min(value = 0, message = "Quantidade deve ser zero ou maior")
    private Integer quantidade;

    @Size(min = 10, max = 255, message = "Descrição deve ter entre 10 e 255 caracteres")
    private String descricao;

    public Produto() {
    }

    public Produto(Long id, String nome, String fabricante ,Double preco, Integer quantidade, String descricao) {
        this.id = id;
        this.nome = nome;
        this.fabricante = fabricante;
        this.preco = preco;
        this.quantidade = quantidade;
        this.descricao = descricao;
    }

    // Getters e Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
